const url      = require('url');
const parseURL = require('../browser/parse-url.js');


const hrefList = [
  'https://user:pass@sub.host.com:8080/p/a/t/h?query1=string1&query2=string2#hash',
  'https://sub.host.com/p/a/t/h?query1=string1&query2=string2',
  'http://sub.host.com',
  'http://sub.host.com:8011',
  'http://sub.host.com?key=value',
];

hrefList.forEach(href => {
  // const resWHATWG = new url.URL(href);
  // const res = parseURL(href);
  // console.log('nodejs   : ', resWHATWG)
  // console.log('parse-url: ', res);
  console.log(/(https?:)\/\/(.+:.+@)?([^\/]+):?([0-9]+)?(.*)/.exec(href));
});
