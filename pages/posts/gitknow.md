---
title: gitknow
date: 2021-08-16 19:57:15
tags: 
    - git
---

 Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。 <br/>

想删除某段代码,又担心会出bug,那么git会记录你每次的改动,每次的迭代都会有版本,方便回退.

<!-- more -->

# git

1.在开发过程中,经常会需要对一个文件进行修改甚至删除,但是我们又会希望保存这个文件的历史记录,达到方便回退的效果,这个时候,如果通过备份,那么管理起来就会很复杂

2.在多人开发时,每个人都会需要修改文件,那么修改或合并就会非常复杂.

git是分布式的版本控制系统。分布式版本控制系统的客户端并不只提取最新版本的文件快照，而是把代码仓库完整地镜像下来。这么一来，任何一处协同工作用的服务器发生故障，事后都可以用任何一个镜像出来的本地仓库恢复。因为每一次的提取操作，实际上都是一次对代码仓库的完整备份.

<div style="height:400px;width:400px;margin:0 auto"><img src="https://z3.ax1x.com/2021/08/17/f59xPO.png"></div>

## git 环境配置

如果是第一次使用,则需要配置用户名与邮箱

```bash
# git config  user.name 你的目标用户名
# git config  user.email 你的目标邮箱名

# 使用--global参数，配置全局的用户名和邮箱，只需要配置一次即可。推荐配置github的用户名和密码
git config --global user.name '自己的用户名'
git config  --global user.email '自己的正确的邮箱'

# 查看配置信息
git config --list
```

## git基础指令

```bash
#初始化git仓库
git init

#将index.html文件提交至暂存区
git add index.html

#将css文件下所有文件提价至暂存区
git add css

#将目录下所有文件提交至暂存区
git add .

#查看文件信息
git status

#将暂存区的文件提交至仓库区
git commit -m '提交信息'

#修改上一次提交信息
git commit --amend -m

#简略查看所有上传日志(不包括已回退的版本)
git log --oneline

#简略查看所有上传日志(包括已回退的版本)
git rflog --oneline

#查看工作区与暂存区代码的不同
git diff

#查看暂存区与仓库区代码的不同
git diff --cached

#查看工作区与仓库区代码的不同
git diff --HEAD

#查看两个版本之前代码的不同
git diff xf2222 xf2223

#将代码回退至指定版本号
git diff --hard xf2222

#创建新分区
git branch 分支名称

#查看分区详情
git branch

#删除指定分区(不能在当前分区删除当前分区)
git branch -d 分区名

#切换至指定分区
git checkout 分区名

#创建分区同时切换至此分区
git checkout -b 分区名

#合并其他分支至此分区
git merge 分支名

#上传本地文件至远程服务器
git push 远程服务器地址 分支名

#克隆远程服务器文件至本地
git clone 远程服务器地址 本地文件夹名

#从远程服务器拉取文件至本地(后续只会拉取与本地有差异的文件)
git pull 远程服务器地址
```

## git忽视文件

> .gitignore 名字放在此文件夹中的文件,不会被git跟踪,也不会被上传
>
> idea.html : 忽视idea.html文件
>
> css : 忽视css文件夹
>
> css/index.css : 忽视css文件夹下的index.css文件
>
> css/*.css : 忽视css文件夹下所有css文件