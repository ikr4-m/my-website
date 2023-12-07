---
title: 'KVM Harden - How to hide your VM from Anti Cheat'
description: 'Sayonara capitalizm.'
date: '2023-12-07'
thumbnail: '/img/2023-12-07/eac_error.png'
categories:
  - kvm
  - windows
  - linux
published: true
---

![vroom](/img/2023-12-07/eac_error.png)

# Table of Contents

# The Easiest Way
Just modify your QEMU XML with some steps:
1. Under `<os>` put
```xml
<smbios mode='host'/>
```
2. Under `<features>` put
```xml
<kvm> 
  <hidden state='on'/> 
</kvm>
```
3. Under `<cpu mode ...>` put
```xml
<feature policy='disable' name='hypervisor'/>
```
*Thank you for [shakinbacon@forumsunraid](https://forums.unraid.net/topic/127639-easy-anti-cheat-launch-error-cannot-run-under-virtual-machine/) for the tutorial.*

# The Hard Way
You can use [QEMU Anti Detection patch from zhaodice@github](https://github.com/zhaodice/qemu-anti-detection) to use. More harden than the easiest way.
