'use strict';
require('../Extension');
const toValue = require('./toValue');

function string(value) {
  return typeof value != 'string'
    ? value
    : value
        .replace(/"?'?/, '')
        .reverse()
        .replace(/"?'?/, '')
        .reverse()
        .replaceFull(['\\n:\n', '\\s:s', '\\t:\t', '\\\\:\\']);
}
function getParam(param) {
  return string(
    toValue(
      Object.fromEntries(
        process.argv
          .filter((_, index) => index > 1)
          .join(' ')
          .replaceAll(' -', ',-')
          .split(',')
          .map(value => {
            value = value.replace(/[\s]*=[\s]*/, '=').split('=');
            let key = value[0];
            value = value.filter((_, index) => index > 0).join('');
            return [key, value];
          })
          .map(value => (value[1] == undefined ? [...value, null] : value))
      )[param]
    )
  );
}
getParam.toValue = toValue;
getParam.string = string;
module['exports'] = getParam;
