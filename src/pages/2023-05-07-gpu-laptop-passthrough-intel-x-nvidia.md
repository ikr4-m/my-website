---
title: 'How To: MUXless GPU Passthrough (NVIDIA x Intel Edition)'
description: 'The most controversional passthrough gaming here'
date: '2023-05-07'
thumbnail: '/img/2023-05-07/gpu_passthrough.jpg'
categories:
  - linux
  - virtio
  - kvm
  - gpu
published: true
---

![vroom](/img/2023-05-07/gpu_passthrough.jpg)

# Table of Contents

# Disclaimer
You are completely responsible for your hardware and software. This guide makes no guarentees that the process will work for you, or will not void your waranty on various parts or break your computer in some way. Everything from here on out is at your own risk.

This tutorial is for laptop that iGPU is still connected to External Monitor/Dummy HDMI. If your laptop's dGPU connected to External Monitor/Dummy HDMI, this tutorial is not for you.

![2nd_monitor](/img/2023-05-07/igpu_external_monitor.png)

# References
- https://lantian.pub/en/article/modify-computer/laptop-intel-nvidia-optimus-passthrough.lantian/
- https://github.com/joeknock90/Single-GPU-Passthrough
- https://gist.github.com/Misairu-G/616f7b2756c488148b7309addc940b28

# Story Behind This Thing
I'm using gaming laptop with linux for working but I still want to be a "gamers". There's some limitation when I gaming in Linux especially the **Anti Cheat** that cannot be used with Proton. The same goes for productive apps like Adobe Premiere/After Effect or Microsoft Office that 100% not compatible with Wine.

*"Why not dual boot?"*

1. I must re-sync all the clock system in Windows and Linux when I'm switching the OS.
2. I must install the same app that I've use in Linux to Windows just for communication. Like Discord for gaming.
3. *This nerd blood is too strong in me...*

# Pros & Cons
For pros:
- Could be faster than dual booting (this is true in my case, it's depends on your system).
- You have ability to switch mode to Hybrid (Optimus) and Integrated (Isolated) with a single command line.
- Using virtual disk, you can bring it all the way.
- `virt-manager` running without sudo like the other tutorial.

For cons:
- This method using preallocated qemu-img that consume a bunch of storage for a better performance.
- You still have to reboot your laptop to switch your GPU.
- You'll need to change some source code from `envycontrol`.

# My Setup
For this tutorial, I'm using MSI Katana GF66 11UD with MUXless scheme and using Garuda Linux distributon. For the specs, you can search it in internet.

# Prerequisites
1. A laptop that can support VT-d/VT-g. Some Intel processor above 7th Generation have this feature.
    - Enable the Intel Virtualization in BIOS first before start geeking.
2. Installing QEMU with virt-manager. You can follow [this tutorial](https://computingforgeeks.com/install-kvm-qemu-virt-manager-arch-manjar/) for the step of installation.
    - After installing QEMU, install [QEMU Hooks](https://computingforgeeks.com/install-kvm-qemu-virt-manager-arch-manjar/) to automate bind/unbind the GPU.
3. [virtio-win drivers and guest tools.](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md) I suggest you to download the ISO file.
4. [spice-guest-tools.](https://www.spice-space.org/download.html#windows-binaries)
5. [Looking Glass, for better gaming.](https://looking-glass.io/)
6. [OPTIONAL] [Windows File System Proxy](https://computingforgeeks.com/install-kvm-qemu-virt-manager-arch-manjar/) to connect your local drive to the VM.

# Procedure
## Enable Intel IOMMU and Load VFIO Modules
1. Modify your kernel parameter (usually in `/etc/default/grub` if you using GRUB), and add:
```
intel_iommu=on iommu=pt kvm.ignore_msrs=1
```
Don't forget to update your GRUB after modify your kernel parameter.

2. Add this module to your initramfs: (in my case, I'm using dracut that location in `/etc/dracut.conf.d/`)
```
add_driver+=" vfio vfio_iommu_type1 vfio_pci vfio_virqfd "
```
Don't forget to update your initramfs after adding some module.

3. Restart your laptop.

## Disable NVIDA From Accessing X-Server
1. Check your GPU. You can use `lspci -nnk | grep -i nvidia` to check if your GPU is still be used by Nvidia/Nouveau module.
2. Copy all [envycontrol](https://github.com/bayasdev/envycontrol) setup.py code to your laptop.
3. Search this line of code:
```py
    if graphics_mode == 'integrated':
        cleanup()

        # blacklist all nouveau and Nvidia modules
        create_file(BLACKLIST_PATH, BLACKLIST_CONTENT)

        # power off the Nvidia GPU with udev rules
        create_file(UDEV_INTEGRATED_PATH, UDEV_INTEGRATED)

        rebuild_initramfs()
```
Give the command that generate file to power off the Nvidia GPU because we still need to use the GPU. The code will look like this:
```py
    if graphics_mode == 'integrated':
        cleanup()

        # blacklist all nouveau and Nvidia modules
        create_file(BLACKLIST_PATH, BLACKLIST_CONTENT)

        # power off the Nvidia GPU with udev rules
        #create_file(UDEV_INTEGRATED_PATH, UDEV_INTEGRATED)

        rebuild_initramfs()
```
4. [OPTIONAL, if you using Dracut] search this line of code:
```py
def rebuild_initramfs():
    # Debian and Ubuntu derivatives
    if os.path.exists('/etc/debian_version'):
        command = ['update-initramfs', '-u', '-k', 'all']
    # RHEL and SUSE derivatives
    elif os.path.exists('/etc/redhat-release') or os.path.exists('/usr/bin/zypper'):
        command = ['dracut', '--force', '--regenerate-all']
    # EndeavourOS with dracut
    elif os.path.exists('/usr/lib/endeavouros-release') and os.path.exists('/usr/bin/dracut'):
        command = ['dracut-rebuild']
```
Change `and` operator to `or` in `EndeavourOS with dracut` because the tools wont execute the dracut-rebuild if you're using dracut without using EndeavourOS distribution.

5. Copy or make symlink to `/usr/bin` and execute this command:
```
sudo envycontrol -s integrated
```
6. Reboot your laptop, check your GPU with `lspci -nnk | grep -i nvidia`. It should your GPU not using nvidia kernel module anymore.

Note: If you want to back to Hybrid mode, just execute this command again:
```
sudo envycontrol -s nvidia
```
And make it sure your GPU using nvidia kernel after rebooting.

Note2: *[Check this out](https://github.com/thatismunn/dotfiles/blob/46cef8ccd5be7096f485c3e650d281f4ec0a5bcc/.localscript/bashrc/alias.d#L17-L19), maybe you can follow my ~~lazy ideas~~.*

## Install KVM
You can follow the instruction for installation VM from [BlandManStudios video](https://youtu.be/eTWf5D092VY?t=468). Some people don't recommend this video because giving bad information or something. But if you want to see how to install an OS to QEMU, I think you can follow his tutorial.

For QEMU Hooks, here is some references that I use for my setup. **Don't copy-paste my hooks because maybe my scene is not same as you.**

`prepare/begin/start.sh`
```sh
#!/bin/bash
# Helpful to read output when debugging
set -x

# Stop Cloudflare WARP Service
systemctl stop warp-svc

# Unbind VTconsole
echo 0 > /sys/class/vtconsole/vtcon0/bind

# Avoid a Race condition by waiting 2 seconds. This can be calibrated to be shorter or longer if required for your system
sleep 2

# Unbind the GPU from display driver
virsh nodedev-detach pci_0000_01_00_0

# Load VFIO Kernel Module  
modprobe vfio-pci  
```

`release/end/revert.sh`
```sh
#!/bin/bash
set -x

# Start Cloudflare WARP Service
systemctl start warp-svc

# Re-Bind GPU to Nvidia Driver
virsh nodedev-reattach pci_0000_01_00_1

# Rebind VT consoles
echo 1 > /sys/class/vtconsole/vtcon0/bind
```

After you install VM. Don't forget to install virtio-driver and spice-guest-tools for better VM QoL.

## Installing Looking Glass
You can follow the installation for setup IVSHMEM and KVM Permission from [Looking Glass wiki](https://looking-glass.io/docs/B6/install/) here. Here's some arguments reference to launch looking glass with my scheme:
```sh
# Launching Looking Glass with changing ScrollLock button to RightCtrl
looking-glass-client -m 97 -c DXGI
```

## [OPTIONAL] VirtIO FS
After installing virtio-driver, add `filesystem` hardware with `virtiofs` and specify your location in VM Manager.
