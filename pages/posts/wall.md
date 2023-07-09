---
title: 墙里秋千墙外道
date: 2023-06-26
updated: 2023-06-26
categories:
- 笔记
tags:
-
---

>ps:请注意！本文只用作个人主观存档，不作为任何示例及教学


<!-- more -->

# 墙里秋千墙外道，墙外行人 墙里佳人笑

## xray(version>1.8.0)

### reality配置模板

> 原理：
>
> - 获取伪装站证书=>发送证书到客户端=>客户端获取密钥=>解密失败=>重定向回伪装站
> - 获取伪装站证书=>发送证书到客户端=>客户端获取密钥=>解密成功=>访问目标站

```json
{
  "log": {
    "loglevel": "warning" //日志等级
  },
  "routing": {
    "domainStrategy": "IPIfNonMatch",
    "rules": [
      {
        "type": "field",
        "ip": ["geoip:cn"],
        "outboundTag": "block"
      }
    ]
  },
  "inbounds": [
    {
      "port": 443,//端口
      "protocol": "vless",//协议
      "settings": {
        "clients": [
          {
            "id": "uuid-uuid-uuid-uuid-uuid",//uuid，使用xray uuid命令生成
            "flow": "xtls-rprx-vision"  //vision是解决了tls in tls问题，xtls是增加tls性能
          }
        ],
        "decryption": "none",
        "fallbacks": [
          {
            "dest": 8080
          }
        ]
      },
      "streamSettings": {
        "network": "tcp",
        "security": "reality",
        "realitySettings": {  
          "dest": "itunes.apple.com:443",//需要偷取伪装站的域名
          "serverNames": ["itunes.apple.com"],//客户端可用的 serverName 列表
          "privateKey": "xrayx25519xrayx25519xrayx25519xrayx25519",//xray x25519命令生成公钥私钥
           //客户端校验id
           //格式：[""]/["0~f"],长度最多16位，且为2的倍数
          "shortIds": ["3f4d5e6f"]
        }
      }
    }
  ],
  "sniffing": {
    "enabled": true,
    "destOverride": ["http", "tls"]
  },
  "outbounds": [
    {
      "protocol": "freedom",
      "tag": "direct"
    },
    {
      "protocol": "blackhole",
      "tag": "block"
    }
  ],
  "policy": {
    "levels": {
      "0": {
        "handshake": 2,
        "connIdle": 147
      }
    }
  }
}
```

~~~json
{
    "outbounds": [ // 客户端出站配置
        {
            "protocol": "vless",
            "settings": {
                "vnext": [
                    {
                        "address": "", // 服务端的域名或 IP
                        "port": 443,
                        "users": [
                            {
                                "id": "", // 与服务端一致
                                "flow": "xtls-rprx-vision", // 与服务端一致
                                "encryption": "none"
                            }
                        ]
                    }
                ]
            },
            "streamSettings": {
                "network": "tcp",
                "security": "reality",
                "realitySettings": {
                    "show": false, // 选填，若为 true，输出调试信息
                    "fingerprint": "chrome", // 必填，使用 uTLS 库模拟客户端 TLS 指纹
                    "serverName": "", // 服务端 serverNames 之一
                    "publicKey": "", // 服务端私钥对应的公钥
                    "shortId": "", // 服务端 shortIds 之一
                    "spiderX": "" // 爬虫初始路径与参数，建议每个客户端不同
                }
            }
        }
    ]
}
~~~

### reality可使用伪装站

~~~javascript
> 域名

- gateway.icloud.com 
- itunes.apple.com
- download-installer.cdn.mozilla.net 
- addons.mozilla.org
- www.microsoft.com
- www.lovelive-anime.jp

> CDN

- swdist.apple.com
- swcdn.apple.com 
- updates.cdn-apple.com
- mensura.cdn-apple.com
- osxapps.itunes.apple.com
- aod.itunes.apple.com
- cdn-dynmedia-1.microsoft.com
- update.microsoft
- software.download.prss.microsoft.com
- s0.awsstatic.com
- d1.awsstatic.com 
- images-na.ssl-images-amazon.com
- m.media-amazon.com
- player.live-video.net
- dl.google.com (ps:使用此伪装站时，请将fingerprint TlS指纹设置为除chrome的任意，chrome似乎对google自家的域名有额外的处理，会被拉黑ip)
~~~

## hysteria(version>1.3.5)

### 配置

~~~json
// server
{
  "protocol": "udp",
  "listen": ":16385",
  "acme": {
    "domains": [
      "your.domain.com"
    ],
    "email": "you@email.com"
  },
  "obfs": "obfsobfsobfsobfs",
    //以下非必须
    "alpn": "h3",
    "auth": {
        "mode": "passwords",
        "config": [
            "domain"
        ]
    },
 }
~~~

~~~json
// client
{
    "protocol": "udp",
    "server": "10.0.0.1:domain,16387-16485",//端口跳跃
    "server_name": "your.example.com",
    "up_mbps": 20,
    "down_mbps": 150,
    "obfs":"obfsobfsobfsobfs"
    "fast_open": true,
    "socks5": {
        "listen": "127.0.0.1:50000"//尽量填写较为冷门的端口，以防被客户端所占用
    }
    //以下非必须
    "alpn": "h3",
    "auth_str": "domain",
}
~~~
~~~js
//多端口跳跃
//安装
apt install -y iptables-persistent
//添加
iptables -t nat -A PREROUTING -i eth0 -p udp --dport 16387:16485 -j DNAT --to-destination :16385
//保存
netfilter-persistent save
//查看
iptables -t nat -nL --line
//删除
iptables -t nat -D PREROUTING 1
~~~

### 示例

>  V2rayN

![image](https://cdn.staticaly.com/gh/lateautumn2/picx-images-hosting@master/20230626/6220048.5exqr3acd3k0.webp)

