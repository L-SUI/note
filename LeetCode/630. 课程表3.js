// 这里有 n 门不同的在线课程，按从 1 到 n 编号。给你一个数组 courses ，其中 courses[i] = [durationi, lastDayi] 表示第 i 门课将会 持续 上 durationi 天课，并且必须在不晚于 lastDayi 的时候完成。

// 你的学期从第 1 天开始。且不能同时修读两门及两门以上的课程。

// 返回你最多可以修读的课程数目。

//  

// 示例 1：

// 输入：courses = [[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]
// 输出：3
// 解释：
// 这里一共有 4 门课程，但是你最多可以修 3 门：
// 首先，修第 1 门课，耗费 100 天，在第 100 天完成，在第 101 天开始下门课。
// 第二，修第 3 门课，耗费 1000 天，在第 1100 天完成，在第 1101 天开始下门课程。
// 第三，修第 2 门课，耗时 200 天，在第 1300 天完成。
// 第 4 门课现在不能修，因为将会在第 3300 天完成它，这已经超出了关闭日期。
// 示例 2：

// 输入：courses = [[1,2]]
// 输出：1
// 示例 3：

// 输入：courses = [[3,2],[4,3]]
// 输出：0
//  

// 提示:

// 1 <= courses.length <= 104
// 1 <= durationi, lastDayi <= 104

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/course-schedule-iii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。





/**
 * @param {number[][]} courses
 * @return {number}
 */
/**
 * @param {number[][]} courses
 * @return {number}
 */
 var scheduleCourse = function(courses) {
    courses.sort((a,b)=>(a[1]-b[1]))
    const pq = new PriorityQueue()
    let t = 0
    for(const course of courses){
        if(t + course[0] > course[1] && pq.size > 0 && pq.peek() > course[0])
            t -= pq.poll()
        if(t + course[0] <= course[1]){
            t += course[0]
            pq.offer(course[0])
        }
    }
    return pq.size
};

class PriorityQueue {
  constructor(
    compare = (a, b) => a > b 
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
