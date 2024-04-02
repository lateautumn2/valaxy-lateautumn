---
title: 友邻
keywords: 链接
description: 深秋的友邻
aside: false
links: /links.json
links2: /friends.json

random: true
---


## 小伙伴们
<YunLinks :links="frontmatter.links2" :random="frontmatter.random" />

## 大佬们
<YunLinks :links="frontmatter.links" :random="frontmatter.random" />


# 友链说明

友链为随机顺序展示，希望交换友链的话可以按此格式在评论区留下信息：

```json
{
"url": "https://shenqiu.me",
"avatar": "https://shenqiu.me/image/avator.jpg",
"name": "深秋",
"blog": "深秋’s blog",
"desc": "人间忽晚，山河已秋",
"color": "skyblue"
}
```
