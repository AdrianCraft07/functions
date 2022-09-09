"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("@agacraft/extension");
const toValue_1 = __importDefault(require("./toValue"));
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
    return string((0, toValue_1.default)(Object.fromEntries(process.argv
        .filter((_, index) => index > 1)
        .join(' ')
        .replaceAll(' -', ',-')
        .split(',')
        .map(value => {
        let array = value.replace(/[\s]*=[\s]*/, '=').split('=');
        let key = array[0];
        value = array.filter((_, index) => index > 0).join('');
        return [key, value];
    })
        .map(value => (value[1] == undefined ? [...value, null] : value)))[param]));
}
getParam.toValue = toValue_1.default;
getParam.string = string;
module.exports = getParam;
