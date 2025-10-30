# ScheduleApp-uniapp

本项目为 ScheduleApp 的 uni-app 迁移版，支持多端（H5/小程序/APP）习惯与日程管理。

## 目录结构
- pages/  页面文件
- components/  组件
- services/  API 封装
- store/  状态管理
- static/  静态资源

## 快速开始
1. 使用 HBuilderX 或 `npx degit dcloudio/uni-preset-vue#vite my-uniapp` 初始化项目
2. 将本仓库代码拷贝到新建项目目录
3. HBuilderX 导入项目，运行到各平台

## 主要适配点
- API 统一用 `services/uni-api.ts` 封装
- 路由页面在 `pages.json` 配置
- 组件、页面语法兼容 uni-app 规范

## 迁移说明
详见 UNIAPP_MIGRATION.md
