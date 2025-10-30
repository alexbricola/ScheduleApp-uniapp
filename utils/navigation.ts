// 路由导航助手：统一封装页面跳转
export function go(path:string){ uni.navigateTo({ url: path }); }
export function goTab(path:string){ uni.switchTab({ url: path }); }
export function redirect(path:string){ uni.redirectTo({ url: path }); }
export function back(delta=1){ uni.navigateBack({ delta }); }