/**
 * 解析 URL 为对象
 * @param  {String} href
 * @return {Object} 查询字符串对象    [description]
 */
module.exports = function parseURL(href) {
  if (href === null || href === undefined) {
    href = '';

    if (typeof window === 'object' && window.location && window.location.href) {
      href = window.location.href;
    }
  }

  var search = decodeURIComponent(href.substring(href.lastIndexOf('?') + 1));
  var obj = {};
  var reg = /([^?&=]+)=([^?&=]*)/g;

  search.replace(reg, (rs, $1, $2) => {
    var name = decodeURIComponent($1);
    var val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });

  var protocol = href.split('//')[0];
  var origin = href.split('?')[0];
  var search = href.split('?')[1];
  search = search ? ('?' + search) : '';

  var username = /(https?:)\/\/(.+:.+@)?([^\/]+):?([0-9]+)?/.exec(href);
  console.log('\nusername: ', username);

  return {
    href: href,
    protocol: protocol,
    query: obj,
    origin: origin,
    search: search,
  };
}
