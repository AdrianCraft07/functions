"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("@agacraft/extension/Object");
require("@agacraft/extension/Array");
require("./colors");
const fs_1 = __importDefault(require("fs"));
const enter = 13;
function ansiRegex(options) {
    options = Object.assign({
        onlyFirst: false,
    }, options);
    const pattern = [
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
    ].join('|');
    return new RegExp(pattern, 'g');
}
function promptPrint(masked, ask, echo, str, insert) {
    if (masked) {
        process.stdout.write('\u001b[2K\u001b[0G' + ask + Array(str.length + 1).join(echo));
    }
    else {
        process.stdout.write('\u001b[s');
        if (insert == str.length) {
            process.stdout.write('\u001b[2K\u001b[0G' + ask + str);
        }
        else {
            if (ask) {
                process.stdout.write('\u001b[2K\u001b[0G' + ask + str);
            }
            else {
                process.stdout.write('\u001b[2K\u001b[0G' + str + '\u001b[' + (str.length - insert) + 'D');
            }
        }
        // Reposition the cursor to the right of the insertion point
        const askLength = (typeof ask === 'string' ? ask.replace(ansiRegex(), '') : ask).length;
        process.stdout.write(`\u001b[${askLength + 1 + (echo == '' ? 0 : insert)}G`);
    }
}
module.exports = function (ask, value, opts) {
    let insert = 0, savedStr, res;
    opts = opts || {};
    if (typeof ask === 'object') {
        opts = ask;
        ask = opts.ask || '';
    }
    else if (typeof value === 'object') {
        opts = value;
        value = opts.value || '';
    }
    ask = value ? `${ask} (${value})` : ask;
    ask = ask ? ask + ' ' : '';
    let echo = opts.echo;
    let masked = 'echo' in opts;
    let getCharacter = !!opts.getCharacter;
    let callback = opts.callback ||
        function () {
            return { valid: true, value: '' };
        };
    let autocomplete = {
        words: opts.autocomplete?.words || [],
        function: function (arg) {
            if (!opts?.autocomplete)
                return [''];
            if (opts?.autocomplete.function !== undefined && typeof opts.autocomplete.function === 'function')
                return opts.autocomplete.function(arg);
            if (opts?.autocomplete.words !== undefined && typeof opts.autocomplete.words)
                return opts.autocomplete.words.filter(str => str.replace(new RegExp(arg, 'ig'), '') != str);
            return [''];
        }
    };
    let fd = process.platform === 'win32'
        ? process.stdin.fd
        : fs_1.default.openSync('/dev/tty', 'rs');
    let wasRaw = process.stdin.isRaw;
    if (!wasRaw) {
        process.stdin.setRawMode && process.stdin.setRawMode(true);
    }
    let buf = Buffer.alloc(3);
    let str = '', strArray = [], character, read, word;
    savedStr = '';
    if (ask) {
        process.stdout.write(ask);
    }
    let cycle = 0;
    while (true) {
        read = fs_1.default.readSync(fd, buf, 0, 3, null);
        if (read > 1) {
            // received a control sequence
            if (buf.toString()) {
                str = str + buf.toString();
                str = str.replace(/\0/g, '');
                insert = str.length;
                promptPrint(masked, ask, echo, str, insert);
                process.stdout.write('\u001b[' + (insert + ask.length + 1) + 'G');
                buf = Buffer.alloc(3);
            }
            continue; // any other 3 character sequence is ignored
        }
        // if it is not a control character seq, assume only one character is read
        character = buf[read - 1];
        if (getCharacter)
            console.log(character);
        // catch a ^C and return value or ''
        if (character == 3) {
            process.stdout.write('^C\n');
            fs_1.default.closeSync(fd);
            process.stdin.setRawMode && process.stdin.setRawMode(wasRaw);
            return value || '';
        }
        // catch a ^D and return value or ''
        if (character == 4) {
            process.stdout.write('\r\u001b[K' + ask);
            str = '';
            insert = 0;
        }
        if (character == enter) {
            let callbackValue = callback(str);
            str = callbackValue.value;
            insert = str.clear.length;
            promptPrint(masked, ask, echo, str, insert);
            str = str.clear;
            if (!callbackValue.valid) {
                continue;
            }
            fs_1.default.closeSync(fd);
            break;
        }
        if (character == 14) {
            str += '^N';
            insert = str.length;
            process.stdout.write('\r\u001b[K' + ask + str);
        }
        if (character == 127 || (process.platform == 'win32' && character == 8)) {
            //backspace
            if (!insert)
                continue;
            str = str.slice(0, insert - 1) + str.slice(insert);
            insert--;
            process.stdout.write('\u001b[2D');
        }
        else {
            if (character < 32 || character > 126)
                continue;
            str =
                str.slice(0, insert) +
                    String.fromCharCode(character) +
                    str.slice(insert);
            insert++;
        }
        // catch a TAB and implement autocomplete
        if (character == 9 && !masked) {
            // TAB
            strArray = str.split(' ');
            word = strArray[strArray.length - 1];
            res = res || autocomplete.function(word);
            if (res.every(res => word != res))
                res = autocomplete.function(word);
            if (res.length == 0) {
                process.stdout.write('\t');
                continue;
            }
            let item = res[cycle++] || res[((cycle = 0), cycle++)];
            if (item) {
                strArray[strArray.length - 1] = item;
                str = strArray.join(' ');
                insert = str.length;
                process.stdout.write('\r\u001b[K' + ask + str);
            }
        }
        promptPrint(masked, ask, echo, str, insert);
    }
    process.stdout.write('\n');
    process.stdin.setRawMode && process.stdin.setRawMode(wasRaw);
    return (str || value || '').replaceAll('^N', '\n');
};
