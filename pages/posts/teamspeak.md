---
title: teamSpeak服务器搭建
date: 2023-07-25
updated: 2023-07-25
categories:
- 杂货铺
tags:
- 笔记
---


>  写在前面


今日午间休息刷贴吧，发现一个帖子在讨论kook，点进去一看，原来是kook即将收费，想来kook作为一个语音软件公测了这么久，收费也无可厚非把，估计也是开个会员提升频道人数，排名值之类把。细看后发现和我想的不一样，收费的项目竟然是降噪和屏幕共享......，只能说太逆天了，基础功能来了一个收费，这是要和YY换一条路走啊！看帖子讨论到后续好像还会有更多的收费，我等白嫖党只能润了，毕竟用的也不多，只在打周末APEX和CSGO用用，每月花15块感觉又太亏，discord对于我的个别朋友来说又有点门槛。正苦恼要回归微信语音的时候，看到某楼说直接换teamspeak，正好想到还有台服务器流量花不完，好了，这下有用处了。

<!-- more -->

接下来就开始本次搭建teamSpeak服务器的流程把！

## 一、介绍

TeamSpeak是一种流行的语音通信（VoIP）软件，旨在为玩家、团队和社区提供高质量的实时语音交流。它是一种客户端-服务器架构的应用程序，允许用户通过互联网或局域网进行语音通话。TeamSpeak最初是为在线游戏而设计的，但现在已经扩展到其他领域，例如商业会议、远程协作和社交聚会。

使用TeamSpeak，用户可以创建和加入称为"服务器"的语音通信频道，与其他用户进行语音对话。每个服务器都有一个唯一的IP地址和端口号，用户需要输入这些信息来连接到服务器。TeamSpeak提供了丰富的功能，包括音频传输优化、音频降噪、音频激励、音频混响等，以提供清晰、高质量的语音通信体验。

TeamSpeak还提供了一些管理工具，允许服务器管理员设置访问权限、频道管理、用户管理等。此外，TeamSpeak还支持插件系统，允许用户扩展其功能，如音乐播放、聊天记录等。

简而言之，老牌开源，可定制性强，带宽和运存占用低（点名批评YY和Kook）

其次，国内也有个teamSpeak中文站，据我目前了解，它应该是没有拿到相关的授权，也曾看到过blog说它的客户端是魔改过的，谁也不知道它往里面加了什么东西，换言之，就是个盗版站，希望大家擦亮眼睛，理性对待。

## 二、准备工作

- 一台服务器，最好是“物理距离”别太远，本次教程机使用HK，debian11
- 下载teamspeak服务端及客户端文件，指路[官网](https://www.teamspeak.com/en/),[汉化包](https://github.com/VigorousPro/TS3-Translation_zh-CN/)
- 一个ssh工具，这里我使用的是[FinalShell](https://www.hostbuf.com/t/988.html)

首先，下载，打开teamspeak的官网，点击Downloads，客户端选择client下载，服务端选择server下载，对应版本不再赘述，请选择对应自己系统的版本。
![teamspeakDownload](https://cdn.staticaly.com/gh/lateautumn2/picx-images-hosting@master/20230725/image.4c8ywvigm2w0.webp)

## 三、配置服务端

一切准备工作就绪后，开始ssh，安装服务端

首先，老生常谈

``` bash
apt update && apt upgrade
```

一般情况下，大家都是以root身份登录服务器（比如楼主这种linux菜鸡），但是teamspeak为了安全起见，强烈要求禁止使用root身份运行，所以我们需要新建一个用户，如teamspeakUser，

``` bash
useradd teamspeakUser -m
passwd teamspeakUser
```

在passwd之后，会要求创建这个用户的密码，根据流程走即可

接下来，解压之前下载好的文件，最好是重命名下文件，如teamspeak3，以下就是解压完后的文件

![file](https://cdn.staticaly.com/gh/lateautumn2/picx-images-hosting@master/20230725/image.38xjsh6c69m0.webp)

然后，使用FinalShell将其上传至/home/teamspeakUser/目录下，因为我们是需要teamspeakUser用户来运行它的，所以需要给它设置权限，将文件所属权归属到teamspeakUser用户下

``` bash
chown -R teamspeakUser:teamspeakUser /home/teamspeakUser/teamspeak3/
```

在运行前，我们还需要为teamspeak创建一个授权文件

``` bash
su teamspeakUser
cd /home/teamspeakUser/teamspeak3
touch .ts3server_license_accepted
```

授权文件建立好之后，即可运行服务端

``` bash
./ts3server_startscript.sh start
```

如果在这一步提示你command not found，那么我们需要为它添加可执行权限

``` bash
chmod +x ts3server_startscript.sh
```

运行之后，你可以看到这样一串信息，那么恭喜你，服务端运行成功了

![success](https://cdn.staticaly.com/gh/lateautumn2/picx-images-hosting@master/20230725/image.5ehasd13e400.webp)

将以上loginname，password,apikey,token复制下来备用，之后Ctrl+c就可以终止服务了

## 四、开放防火墙

如果你使用是如腾讯云，阿里云，aws等大厂ec2实例，请前往面板策略组放行以下端口：

- 9987 UDP
- 10011 TCP
- 30033 TCP

如果你使用的是坊间流传Vps，那么是不用做处理的，默认放行了所有端口

## 五、设置开机自启动及快捷脚本

首先切换回root用户

``` bash
su 
```

会需要输入root用户密码，正常输入即可切换
然后新建一个service文件，文件名以teamspeak3.service为例(编辑器不做要求，使用你习惯的即可)

``` bash
nano /lib/systemd/system/teamspeak3.service
```

文件内容如下

``` bash
[Unit]
Description=Teamspeak server
After=network.target
[Service]
WorkingDirectory=/home/teamspeakUser/teamspeak3
User=teamspeakUser
Group=teamspeakUser
Type=forking
ExecStart=/home/teamspeakUser/teamspeak3/ts3server_startscript.sh start inifile=ts3server.ini
ExecStop=/home/teamspeakUser/teamspeak3/ts3server_startscript.sh stop
PIDFile=/home/teamspeakUser/teamspeak3/ts3server.pid
RestartSec=15
Restart=always
[Install]
WantedBy=multi-user.target
```

:::danger 注意
WorkingDirectory，ExecStart，ExecStop，PIDFile为你的服务端文件的绝对路径，请注意你的文件路径是否与我一致
:::

之后保存，reboot即可
文件编辑完后，先别急着systemctl start teamspeak3,因为你可能会提示缺少对应的配置文件

![error](https://cdn.staticaly.com/gh/lateautumn2/picx-images-hosting@master/20230725/image.6m6nm5n51lc0.webp)


所以，你还需要完成以下步骤，

``` bash
su  teamspeakUser
cd /home/teamspeakUser/teamspeak3
./ts3server_minimal_runscript.sh createinifile=1
```

当出现如下信息时，说明配置文件已经生成

![info](https://cdn.staticaly.com/gh/lateautumn2/picx-images-hosting@master/20230725/image.7i1nvgv2i4c0.webp)

此时Ctrl+c退出，重新回到root，再次启动teamspeak3，并查看状态

``` bash
# 开启服务
systemctl start teamspeak3
# 设置服务开机自启
systemctl enable teamspeak3
# 查看服务当前状态
systemctl status teamspeak3
# 关闭服务
systemctl stop teamspeak3
```

![success](https://cdn.staticaly.com/gh/lateautumn2/picx-images-hosting@master/20230725/image.7d76np8rgeo0.webp)

好了，大功告成，服务开启成功

## 六、常见错误

1. 使用su teamspeakUser无法切换用户，你会看到一个$提示符，导致切换用户失败

解决办法：当你想要切换到 teamspeakUser 用户后，你会看到一个 $ 提示符，表示你当前使用的是 `/bin/sh Shell`。这是一个较简化的 Shell，可能没有某些高级功能或配置，所以你需要使用以下指令强制切换到指定的shell

``` bash
su -s /bin/bash teamspeakUser
```

亦或者使用以下指令修改teamspeakUser用户的默认shell之后，再su

``` bash
usermod -s /bin/bash teamspeakUser
su teamspeakUser
```

2. 当你想要使用`./ts3server_minimal_runscript.sh createinifile=1`为teamspeak创建配置文件时，提示一大片的error，如下

![error](https://cdn.staticaly.com/gh/lateautumn2/picx-images-hosting@master/20230725/image.2nr55a8o65w0.webp)

解决办法：请切换回root用户运行生成配置文件命令，或者在当前身份下使用sudo


## 七、客户端配置

客户端配置，请根据自己使用的客户端版本进行配置，这里不做赘述