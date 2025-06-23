---
title: 'Unhinged Ansible: Single Inventory with no Hassle'
description: 'How to write dynamic ansible inventory without hassle'
date: '2025-06-23'
#last_updated: '0000-00-00'
categories:
  - linux
  - ansible
  - cicd
published: true
---

![tumnel](/img/2025-06-23/2025-06-23-130718.png)

# Table of Contents

# Introduction
I always thinking is it possible to write only this command,
```bash
$ ansible-playbook playbook.yaml
```
without adding another parameter like `-K` or `-i` or another parameter and it should be dynamicly without installing a single extra dependency.

After some hours wasting time for reading documentation, hallucinate with Gemini and ChatGPT, and some experimenting, you just need to write all your credentials and ansible spec in the playbook inventory.

# Requirements
The method that I've used only using all tools that installed from ansible that you don't need to installing another dependencies for achieve this.

From Ansible, we need only use this tool:
1. `ansible-playbook` -> For execute your ansible
2. `ansible-vault` -> (Optional) for encrypt your credentials

You can download Ansible [from this documentation](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html). There's a bunch of method that can be you used for installing Ansible since Ansible written in Python.

# Folder Structure
```
ubuntu
├── vars
|   └── user.yaml -> Shorthand for modify vars
├── ansible.cfg -> Ansible configuration
├── Inventory.yaml -> Inventory
└── playbook.yaml -> Playbook
```

# Study Case
In this article, I will discuss my case which is currently going to do massive modification on sudoers. My server right now using LDAP with a bunch of groups so it's impossible to execute without running as `root`. The step that I need to execute is:
## 1. Using my user
1. Grant my SSH Key to root user
2. Modify SSH Config to permit root login
## 2. Using Root
1. Reset sudoers and remove all unecessary rules
2. Add new groups as an admin
## 3. Using my user again
1. Delete my SSH Key in root user
2. Modify SSH Config to not permit all login request to root

# Code
*This is the magic happened.*

## `ansible.cfg`
This file is only for pinning Inventory and Python Interpreter path. You can modified like this:
```ini
[defaults]
inventory = Inventory.yaml
ansible_python_interpreter = /usr/bin/python3
```

## `Inventory.yaml`
This file used to save all your configuration like user login, password, and another configuration that need to be consume to playbook.

If the inventory contains super-credentials value, this is the perfect time to using `ansible-vault` to encrypt the inventory file.
```yaml
# We start from `all` hosts, but if you want to create host category, you can use all.children.<groupname> props.
all:
  hosts:
    # Set group name called server
    server:
      ansible0.local:
        # Initial user of the server. You can safely remove this variable if all the initial user on each
        # server is same.
        initial_user:
          # Username of the initial_user
          # (str) => default: ubuntu
          username: ubuntu
          # Password of the default user
          # (str) => default: None
          password: ''
          # Public key of the initial user
          # (str) => default: None
          pubkey: 'ssh-ed25519 uwu_uwu ikr4m@uwuntu'

  vars:
    # Initial user of the server. You can safely remove this variable.
    # Use this variable if all initial_user is same on each node.
    initial_user:
      # Username of the initial user
      # (str) => default: ubuntu
      username: ubuntu
      # Password of the initial user
      # (str) => default: None
      password: ''
      # Public key of the initial user
      # (str) => default: None
      pubkey: 'ssh-ed25519 uwu_uwu ikr4m@uwuntu'
```

## `vars/user.yaml`
This file used to parse `initial_user` variable in Inventory. This is the reason that you didn't need to add `-K` and prompting your password before executing ansible-playbook.
```yaml
ansible_user: >-
  {{
    (hostvars[inventory_hostname].initial_user.username
      if hostvars[inventory_hostname].initial_user is defined
      else initial_user.username)
  }}
ansible_become_pass: >-
  {{
    (hostvars[inventory_hostname].initial_user.password
      if hostvars[inventory_hostname].initial_user is defined
      else initial_user.password)
  }}
```
`ansible_user` and `ansible_become_pass` is a [Special Variables](https://docs.ansible.com/ansible/latest/reference_appendices/special_variables.html) that will be automatically consumed by Ansible before connecting to SSH.

## `playbook.yaml`
Self-explanatory. This is your playground.
```yaml
# Step 1: Setup Root
- hosts: all
  become: true
  tasks:
    - name: Get initial_user variable
      ansible.builtin.set_fact:
        initial_user: '{{ hostvars[inventory_hostname].initial_user if hostvars[inventory_hostname] is defined else intial_user }}'
    - name: Add new public key 
      ansible.builtin.lineinfile:
        path: /root/.ssh/authorized_keys
        line: '{{ initial_user.pubkey }}'
        mode: 0600
        state: present
        insertafter: EOF
        create: yes
    - name: Set PermitRootLogin
      ansible.builtin.lineinfile:
        path: /etc/ssh/sshd_config
        regexp: ^(|#)PermitRootLogin.*$
        line: PermitRootLogin prohibit-password
    - name: Restart SSH
      ansible.builtin.systemd_service:
        state: restarted
        name: ssh

# Step 2: Modify Sudoers
- hosts: all
  become: true
  vars:
    # Change user to root
    ansible_user: root
  tasks:
    - name: Remove sudoers
      ansible.builtin.file:
        path: /etc/sudoers
        state: absent
    - name: Add sudoers with initial state
      ansible.builtin.blockinfile:
        path: /etc/sudoers
        create: true
        mode: 0500
        block: |
          # This file MUST be edited with the 'visudo' command as root.
          #
          # Please consider adding local content in /etc/sudoers.d/ instead of
          # directly modifying this file.
          #
          # See the man page for details on how to write a sudoers file.
          #
          Defaults        env_reset
          Defaults        mail_badpass
          Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
          # This fixes CVE-2005-4890 and possibly breaks some versions of kdesu
          # (#1011624, https://bugs.kde.org/show_bug.cgi?id=452532)
          Defaults        use_pty
          # User privilege specification
          root    ALL=(ALL:ALL) ALL
          # See sudoers(5) for more information on "@include" directives:
          @includedir /etc/sudoers.d
    - name: Add new file for admin user
      ansible.builtin.file:
        path: /etc/sudoers.d/01-admin-user
        state: touch
        mode: 0600
    - name: Append file to admin user
      ansible.builtin.blockinfile:
        path: /etc/sudoers.d/01-admin-user
        create: true
        mode: 0600
        block: |
          # Grant atmint groups to execute sudo
          %atmint ALL=(ALL) ALL

# Step 3: Reset Root
- hosts: all
  become: true
  tasks:
    - name: Remove authorized key
      ansible.builtin.file:
        path: /root/.ssh/authorized_keys
        state: absent
    - name: Create new empty authorized key
      ansible.builtin.file:
        path: /root/.ssh/authorized_keys
        state: touch
        mode: 0600
    - name: Set PermitRootLogin to none
      ansible.builtin.lineinfile:
        path: /etc/ssh/sshd_config
        regexp: ^(|#)PermitRootLogin.*$
        line: PermitRootLogin no
    - name: Restart SSH
      ansible.builtin.systemd_service:
        state: restarted
        name: ssh
```

# Apply Playboook
Now for the magic moment. To run the entire process, you can execute:
```bash
$ ansible-playbook playbook.yaml
```
