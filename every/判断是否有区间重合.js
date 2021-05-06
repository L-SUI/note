// 任意给定两个区间，写一个函数isOverlapped判断这两个区间是否有重叠（不存在非法数据，区间都是闭区间）。
/**
 * @param {Range} first - 第一个区间
 * @param {Range} second - 第二个区间
 * @return {boolean} 是否重叠
 */
function isOverlapped(first, second){
    // TO DO
    const arr = [first,second]
    arr.sort((a,b) => {
        if(a[0]==b[0]) return a[1]-b[1];
        else return a[0]-b[0]
    })
    return arr[0][1]<=arr[1][0]
}