---
title: FFMPEG Server Stream from Linux Server/VM to Client
description: How to streaming audio with FFMPEG in bidirectional way.
date: '2022-06-26'
categories:
  - linux
  - ffmpeg
published: true
---

# Table of Contents

# Prerequisite
- FFMPEG (Both in Client and Server)
- Intention

# Tutorial
This tutorial will split into two parts.

## Client Side
Just open your command shell and execute this command
```sh
ffplay -nodisp -ac 2 -acodec pcm_s16le -ar 48000 -analyzeduration 0 -probesize 32 -f s16le -i udp://0.0.0.0:18181?listen=1
```
This command will listening ffmpeg server that hosted in localhost from VM with 48kHz bitrate.

## Server Side
1. Set Null Output with sink name `remote`.

```sh
pactl load-module module-null-sink sink_name=remote 
```

2. Launch ffmpeg streamer, catch the sound from `remote` sink, and stream to WSL2 bridge ethernet.

```sh
IP_ROUTE=$(ip route list default | awk '{print $3}')
ffmpeg -f pulse -i "remote.monitor" -ac 2 -acodec pcm_s16le -ar 48000 -f s16le "udp://${IP_ROUTE}:18181"
```

Some tips: If you want to use this command for startup, stall the process using `&` after ffmpeg command.

# Bugs
- Sometimes if you playing YouTube and change the video will feel delayed. To fix that just restart client listener.