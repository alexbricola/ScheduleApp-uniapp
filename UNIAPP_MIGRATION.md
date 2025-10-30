# UNI-APP 全量迁移说明 (自动生成初稿)

本文件概述从原 Vue3 + Vite + Pinia 项目迁移到 uni-app 的已完成工作与后续优化建议。

## 已完成的自动化迁移内容
- 基础目录结构创建（pages / components / store / services / utils / static）
- 创建核心配置：pages.json, manifest.json, README.md
- API 封装：services/api.ts (自动选择 mock 或后端)，services/mock.ts
- 日志与任务、计划、用户、签到等 Pinia store 迁移（使用 uni 存储）
- 生成首页、登录、注册、日志、个人信息、创建计划、任务详情页面
- generate-log 逻辑迁移
- 导航助手 utils/navigation.ts
- App.vue 与 main.ts 初始化（SSR 风格）

## 待补充/人工适配
1. 原有计划任务管理页、日历视图、重复任务展开逻辑尚未迁移
2. 样式体系（CSS 变量、移动端适配）需统一到 uni-app (可用scss + rpx)
3. API 类型定义现为占位 (`services/api.types.ts`)：需要复制原 `src/services/api.types.ts` 内容并调整路径
4. 未引入网络错误 Toast 统一处理，可封装 request 拦截
5. 任务/计划创建页缺少校验与频率逻辑细化（如 repeat 相关）
6. 尚未加入自动构建脚本或 CI
7. 缺少测试（Vitest 转为 HBuilderX/uni-tests 或保持独立）
8. 多端差异（小程序端权限、APP 端原生能力）尚未评估

## 下一步建议
- [ ] 复制类型定义，替换占位
- [ ] 增加计划任务列表页（/pages/plan/tasks.vue）
- [ ] 增加日历组件与页面
- [ ] 封装统一 Toast + Loading + Error UI
- [ ] 抽象 request 拦截器（token 自动附加、401 处理）
- [ ] 优化 storage：考虑使用持久化 + 版本迁移策略
- [ ] 添加 E2E / 单元测试方案说明

## 统一 API 拦截示例（待实现）
```ts
function request<T>(url:string, method:'GET'|'POST'|'PUT'|'DELETE', data?:any): Promise<T> {
  const token = uni.getStorageSync('token');
  return new Promise((resolve,reject)=>{
    uni.request({
      url: BASE_URL + url,
      method,
      data,
      header: token? { Authorization: 'Bearer ' + token } : {},
      success(res){
        if(res.statusCode === 200) resolve(res.data as T);
        else if(res.statusCode === 401){ uni.reLaunch({ url:'/pages/auth/login' }); reject(new Error('未授权')); }
        else reject(new Error('HTTP '+res.statusCode));
      },
      fail(err){ reject(err); }
    });
  });
}
```

## 注意事项
- uni-app 不支持直接使用浏览器特有 API（部分 localStorage 可换为 uni.setStorageSync）
- Vue Router 逻辑需通过 `pages.json` + `uni.navigateTo` 等替换
- 组件标签使用 `<view>` `<text>` `<button>` 更好跨端

## 后续可以邀请我继续：
- 增量页面迁移
- 性能与包体积优化
- 真机调试与差异兼容
- 接入后端/云开发

---
生成时间: 