// 你喜欢snake_case 还是camelCase ?

// 请实现一个函数将snake_case转换为camcelCase。


// snakeToCamel('snake_case') 
// // 'snakeCase'
// snakeToCamel('is_flag_on') 
// // 'isFlagOn'
// snakeToCamel('is_IOS_or_Android') 
// // 'isIOSOrAndroid'
// snakeToCamel('_first_underscore') 
// // '_firstUnderscore'
// snakeToCamel('last_underscore_') 
// // 'lastUnderscore_'
// snakeToCamel('_double__underscore_') 
// // '_double__underscore_'
// 连续的下划线__，打头的下划线 _a和结尾的下划线a_需要被保留。
// https://bigfrontend.dev/zh/problem/convert-snake_case-to-camelCase




/**
 * @param {string} str
 * @return {string}
 */
 function snakeToCamel(str) {
    return str.replace(/([^_])_([^_])/g, (_, before, after) => before + after.toUpperCase())
  }