// 有效数字（按顺序）可以分成以下几个部分：

// 一个 小数 或者 整数
// （可选）一个 'e' 或 'E' ，后面跟着一个 整数
// 小数（按顺序）可以分成以下几个部分：

// （可选）一个符号字符（'+' 或 '-'）
// 下述格式之一：
// 至少一位数字，后面跟着一个点 '.'
// 至少一位数字，后面跟着一个点 '.' ，后面再跟着至少一位数字
// 一个点 '.' ，后面跟着至少一位数字
// 整数（按顺序）可以分成以下几个部分：

// （可选）一个符号字符（'+' 或 '-'）
// 至少一位数字
// 部分有效数字列举如下：

// ["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"]
// 部分无效数字列举如下：

// ["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]
// 给你一个字符串 s ，如果 s 是一个 有效数字 ，请返回 true 。

//  

// 示例 1：

// 输入：s = "0"
// 输出：true
// 示例 2：

// 输入：s = "e"
// 输出：false
// 示例 3：

// 输入：s = "."
// 输出：false
// 示例 4：

// 输入：s = ".1"
// 输出：true
//  

// 提示：

// 1 <= s.length <= 20
// s 仅含英文字母（大写和小写），数字（0-9），加号 '+' ，减号 '-' ，或者点 '.' 。


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/valid-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {string} s
 * @return {boolean}
 */
 var isNumber = function(s) {
    const State = {
        STATE_INITIAL : "STATE_INITIAL",
        STATE_INT_SIGN : "STATE_INT_SIGN",
        STATE_INTEGER : "STATE_INTEGER",
        STATE_POINT : "STATE_POINT",
        STATE_POINT_WITHOUT_INT : "STATE_POINT_WITHOUT_INT",
        STATE_FRACTION : "STATE_FRACTION",
        STATE_EXP : "STATE_EXP",
        STATE_EXP_SIGN : "STATE_EXP_SIGN",
        STATE_EXP_NUMBER : "STATE_EXP_NUMBER",
        STATE_END : "STATE_END"
    }

    const CharType = {
        CHAR_NUMBER : "CHAR_NUMBER",
        CHAR_EXP : "CHAR_EXP",
        CHAR_POINT : "CHAR_POINT",
        CHAR_SIGN : "CHAR_SIGN",
        CHAR_ILLEGAL : "CHAR_ILLEGAL"
    }

    const toCharType = (ch) => {
        if (!isNaN(ch)) {
            return CharType.CHAR_NUMBER;
        } else if (ch.toLowerCase() === 'e') {
            return CharType.CHAR_EXP;
        } else if (ch === '.') {
            return CharType.CHAR_POINT;
        } else if (ch === '+' || ch === '-') {
            return CharType.CHAR_SIGN;
        } else {
            return CharType.CHAR_ILLEGAL;
        }
    }   

    const transfer = new Map();
    const initialMap = new Map();
    initialMap.set(CharType.CHAR_NUMBER, State.STATE_INTEGER);
    initialMap.set(CharType.CHAR_POINT, State.STATE_POINT_WITHOUT_INT);
    initialMap.set(CharType.CHAR_SIGN, State.STATE_INT_SIGN);
    transfer.set(State.STATE_INITIAL, initialMap);
    const intSignMap = new Map();
    intSignMap.set(CharType.CHAR_NUMBER, State.STATE_INTEGER);
    intSignMap.set(CharType.CHAR_POINT, State.STATE_POINT_WITHOUT_INT);
    transfer.set(State.STATE_INT_SIGN, intSignMap);
    const integerMap = new Map();
    integerMap.set(CharType.CHAR_NUMBER, State.STATE_INTEGER);
    integerMap.set(CharType.CHAR_EXP, State.STATE_EXP);
    integerMap.set(CharType.CHAR_POINT, State.STATE_POINT);
    transfer.set(State.STATE_INTEGER, integerMap);
    const pointMap = new Map() 
    pointMap.set(CharType.CHAR_NUMBER, State.STATE_FRACTION);
    pointMap.set(CharType.CHAR_EXP, State.STATE_EXP);
    transfer.set(State.STATE_POINT, pointMap);
    const pointWithoutIntMap = new Map();
    pointWithoutIntMap.set(CharType.CHAR_NUMBER, State.STATE_FRACTION);
    transfer.set(State.STATE_POINT_WITHOUT_INT, pointWithoutIntMap);
    const fractionMap = new Map();
    fractionMap.set(CharType.CHAR_NUMBER, State.STATE_FRACTION);
    fractionMap.set(CharType.CHAR_EXP, State.STATE_EXP);
    transfer.set(State.STATE_FRACTION, fractionMap);
    const expMap = new Map(); 
    expMap.set(CharType.CHAR_NUMBER, State.STATE_EXP_NUMBER);
    expMap.set(CharType.CHAR_SIGN, State.STATE_EXP_SIGN);
    transfer.set(State.STATE_EXP, expMap);
    const expSignMap = new Map();
    expSignMap.set(CharType.CHAR_NUMBER, State.STATE_EXP_NUMBER);
    transfer.set(State.STATE_EXP_SIGN, expSignMap);
    const expNumberMap = new Map();
    expNumberMap.set(CharType.CHAR_NUMBER, State.STATE_EXP_NUMBER);
    transfer.set(State.STATE_EXP_NUMBER, expNumberMap);

    const length = s.length;
    let state = State.STATE_INITIAL;

    for (let i = 0; i < length; i++) {
        const type = toCharType(s[i]);
        if (!transfer.get(state).has(type)) {
            return false;
        } else {
            state = transfer.get(state).get(type);
        }
    }
    return state === State.STATE_INTEGER || state === State.STATE_POINT || state === State.STATE_FRACTION || state === State.STATE_EXP_NUMBER || state === State.STATE_END;
};
