/**
 * 对外输出一个构造函数直接使用
 * 每个请求有自己单独的 header 等属性，互不干扰
 * demo:
 *   Http().get('https://hostname.com/path/to/resources')
 *     .then(res => {
 *       // res 是 HTTP 响应的 body
 *     });
 */
function Http() {
  if (!(this instanceof Http)) {
    return new Http();
  }

  const position = {};

  this.header = {
    'x-position': JSON.stringify({latitude: position.lat, longitude: position.lng}),
  };

  const storageUserInfo = wx.getStorageSync('wxUserInfo');
  if (storageUserInfo && storageUserInfo.token) {
    this.header.Authorization = `Bearer ${storageUserInfo.token}`;
  }

  this.config = {
    showLoading: true,
  };
}

Http.prototype.type = function(ctype = 'form') {
  if (ctype === 'form') {
    this.header['Content-Type'] = 'application/x-www-form-urlencoded';
  } else if (ctype === 'json') {
    this.header['Content-Type'] = 'application/json';
  }
  return this;
};

/**
 * 本次请求不显示 loading
 */
Http.prototype.noLoading = function() {
  this.config.showLoading = false;
  return this;
};

Http.prototype.get = function (url, params) {
  return this._request(url, params, 'GET');
};

Http.prototype.post = function(url, body) {
  return this._request(url, body, 'POST');
};

Http.prototype.delete = function (url, params) {
  return this._request(url, params, 'DELETE');
};

Http.prototype.put = function(url, body) {
  return this._request(url, body, 'PUT');
};

/**
 * 设置头部
 */
Http.prototype.setHeader = function() {
  let args = arguments;
  let obj = {};
  if ((args.length === 2)
    && (typeof args[0] === 'string')
    && (typeof args[1] === 'string')
  ) {
    obj[args[0]] = args[1];
  } else if (args.length === 1 && (typeof args[0] === 'object')) {
    obj = args[0];
  } else {
    throw '[Http.prototype.setHeader] 参数错误';
  }

  Object.assign(this.header, obj);
  return this;
};

Http.prototype._request = function(url, data, method) {
  return new Promise((resolve, reject) => {
    if (this.config.showLoading) {
      wx.showLoading({
        title: '请稍等',
        mask: true,
      });
    }

    wx.request({
      url,
      data,
      header: this.header,
      method,
      success: (res) => {
        setTimeout(() => {
          if (this.config.showLoading) {
            wx.hideLoading();
          }
        }, 300);
        const statusCode = res.statusCode;
        if ((statusCode >= 400) || (res.data.code !== 0)) {
          reject(res.data);
        } else {
          resolve(res.data);
        }
      },
      fail: (err) => {
        setTimeout(() => {
          if (this.config.showLoading) {
            wx.hideLoading();
          }
        }, 400);
        reject(err);
      }
    });
  });
};

module.exports = Http;
