// uni-app API 适配层，统一封装 uni.request
export function uniRequest(options: UniApp.RequestOptions): Promise<UniApp.RequestSuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res as UniApp.RequestSuccessCallbackResult);
        } else {
          reject(res);
        }
      },
      fail: reject
    });
  });
}

// 其他 API 封装可在此扩展
