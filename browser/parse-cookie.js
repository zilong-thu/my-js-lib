/**
 * 从 cookie 模块中提取修改
 *
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 */
function parseCookie(str, options) {
  /* eslint camelcase:0, yoda:0 */
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(/; */);
  var dec = opt.decode || decodeURIComponent;

  pairs.forEach(function (pair) {
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      return;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' === val[0]) {
      val = val.slice(1, -1);
    }

    var decoded = dec(val);
    // only assign once
    // 修改为 发现重复 key，则变成数组
    if (undefined === obj[key]) {
      obj[key] = decoded;
    } else if (Array.isArray(obj[key])) {
      obj[key].push(decoded);
    } else {
      obj[key] = [obj[key], decoded];
    }
  });

  return obj;
}

module.exports = parseCookie;
