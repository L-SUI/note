// 有一棵特殊的苹果树，一连 n 天，每天都可以长出若干个苹果。在第 i 天，树上会长出 apples[i] 个苹果，这些苹果将会在 days[i] 天后（也就是说，第 i + days[i] 天时）腐烂，变得无法食用。也可能有那么几天，树上不会长出新的苹果，此时用 apples[i] == 0 且 days[i] == 0 表示。

// 你打算每天 最多 吃一个苹果来保证营养均衡。注意，你可以在这 n 天之后继续吃苹果。

// 给你两个长度为 n 的整数数组 days 和 apples ，返回你可以吃掉的苹果的最大数目。

//  

// 示例 1：

// 输入：apples = [1,2,3,5,2], days = [3,2,1,4,2]
// 输出：7
// 解释：你可以吃掉 7 个苹果：
// - 第一天，你吃掉第一天长出来的苹果。
// - 第二天，你吃掉一个第二天长出来的苹果。
// - 第三天，你吃掉一个第二天长出来的苹果。过了这一天，第三天长出来的苹果就已经腐烂了。
// - 第四天到第七天，你吃的都是第四天长出来的苹果。
// 示例 2：

// 输入：apples = [3,0,0,0,0,2], days = [3,0,0,0,0,2]
// 输出：5
// 解释：你可以吃掉 5 个苹果：
// - 第一天到第三天，你吃的都是第一天长出来的苹果。
// - 第四天和第五天不吃苹果。
// - 第六天和第七天，你吃的都是第六天长出来的苹果。
//  

// 提示：

// apples.length == n
// days.length == n
// 1 <= n <= 2 * 104
// 0 <= apples[i], days[i] <= 2 * 104
// 只有在 apples[i] = 0 时，days[i] = 0 才成立


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/maximum-number-of-eaten-apples
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number[]} apples
 * @param {number[]} days
 * @return {number}
 */
/**
 * @param {number[]} apples
 * @param {number[]} days
 * @return {number}
 */
 var eatenApples = function(apples, days) {
    const pq = new PriorityQueue(), n = apples.length
    let i = 0, ans = 0
    while(i < n || pq.size > 0){
        while(pq.size > 0 && pq.peek()[0] <= i)
            pq.poll()
        if(i < n && apples[i] > 0)
            pq.offer([i + days[i], apples[i]])
        if(pq.size > 0){
            ans++
            if(--pq.peek()[1]==0)
                pq.poll()
        }
        i++
    }
    return ans
};


class PriorityQueue {
  constructor(
    compare = (a, b) => a[0] < b[0] 
    ){
    this.data = []
    this.size = 0
    this.compare = compare
  }

  peek() {
    return this.size === 0 ? null : this.data[0] 
  }

  offer(val) {
    this.data.push(val)
    this._shifUp(this.size++)
  }

  poll() {
    if(this.size === 0) { return null }
    this._swap(0, --this.size)
    this._shifDown(0)
    return this.data.pop()
  }

  _parent(index) {
    return index - 1 >> 1
  }
  
  _child(index) {
    return (index << 1) + 1
  }

  _shifDown(index) {
    while(this._child(index) < this.size) {
      let child = this._child(index)
      if(child + 1 < this.size 
        && this.compare(this.data[child + 1], this.data[child])) {
          child = child + 1
      }
      if(this.compare(this.data[index], this.data[child])){
        break
      }
      this._swap(index, child)
      index = child
    }
  }

  _shifUp(index) {
    while(this._parent(index) >= 0 
    && this.compare(this.data[index], this.data[this._parent(index)])) {
      this._swap(index, this._parent(index))
      index = this._parent(index)
    }
  }

  _swap(a, b) {
    [this.data[a], this.data[b]] = [this.data[b], this.data[a]]
  }
}



let apples = [1,2,3,5,2], days = [3,2,1,4,2];
console.log(eatenApples(apples, days));
apples = [2,1,10], days = [2,10,1];
console.log(eatenApples(apples, days));