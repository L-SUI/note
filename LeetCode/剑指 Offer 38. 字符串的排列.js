// 输入一个字符串，打印出该字符串中字符的所有排列。

//  

// 你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

//  

// 示例:

// 输入：s = "abc"
// 输出：["abc","acb","bac","bca","cab","cba"]
//  

// 限制：

// 1 <= s 的长度 <= 8

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {string} s
 * @return {string[]}
 */
 var permutation = function(s) {
    const ret = [];
    const arr = Array.from(s).sort();

    const nextPermutation = (arr) => {
        let i = arr.length - 2;
        while (i >= 0 && arr[i] >= arr[i + 1]) {
            i--;
        }
        if (i < 0) {
            return false;
        }
        let j = arr.length - 1;
        while (j >= 0 && arr[i] >= arr[j]) {
            j--;
        }
        swap(arr, i, j);
        reverse(arr, i + 1);
        return true;
    }

    const swap = (arr, i, j) => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    const reverse = (arr, start) => {
        let left = start, right = arr.length - 1;
        while (left < right) {
            swap(arr, left, right);
            left++;
            right--;
        }
    }

    do {
        ret.push(arr.join(''));
    } while (nextPermutation(arr));
    const size = ret.length;
    const retArr = new Array(size).fill(0);
    for (let i = 0; i < size; i++) {
        retArr[i] = ret[i];
    }
    return retArr;
};