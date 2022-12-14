"use strict";
module.exports = function (colors) {
    var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta'];
    return function (letter, i) {
        if (letter === ' ') {
            return letter;
        }
        else {
            return colors[rainbowColors[i++ % rainbowColors.length]](letter);
        }
    };
};
