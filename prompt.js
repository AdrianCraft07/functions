"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const input_1 = __importDefault(require("./input"));
require("./colors");
const classes = {
    number: (str) => Number(str),
    boolean: (str) => str === 'true',
    string: (str) => str,
    object: (str) => new Function(`return ${str}`)(),
};
module.exports = function prompt(inputs) {
    return new Promise(resolve => {
        const obj = {};
        inputs.map(Input => {
            return obj[Input.name] = classes[Input.type]((0, input_1.default)({
                ask: Input.message,
                callback(str) {
                    let valid = !((Input.type === 'number' && isNaN(Number(str))) ||
                        (Input.type === 'boolean' && str !== 'true' && str !== 'false') ||
                        (Input.type === 'object' &&
                            new Function(`let res;try{res=new Function('return ${str}')()}catch(e){}return res`)() === undefined));
                    let res = str;
                    if (valid)
                        res = res.green;
                    else
                        res = res.redBright;
                    return {
                        valid,
                        value: str,
                    };
                },
            }));
        });
        return resolve(obj);
    });
};
