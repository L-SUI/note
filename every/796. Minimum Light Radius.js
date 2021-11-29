
// ; 给你一个整数数组nums，每个元素nums[i]代表一条直线上房屋的坐标。你有3盏路灯，可以放在坐标线上的任何地方，在坐标x处的一盏灯可以照亮[x-r, x+r] 范围内的房屋。
// ; 返回所需的最小的半径r，使得我们只需放置3盏灯，就能照亮所有的房子。

// ; 分析:
// ; 半径很可能有小数，如果一直用小数计算很可能出现精度问题，如果改成求最小直径就变成了整数问题，因为每个房子的坐标都是整数，那直径是房子坐标的差也一定是整数。
// ; 后面才可以用整数二分的方法来做。

// ; 另外, 测试了一下其他case, 发现输入的数组可以是无序的。
// ; 先排个序，方便后面处理。


// ; 方法: 二分搜索
// ; 前面提到了, 我们做(整数)二分搜索, 比较靠谱的方法是枚举直径。

// ; 而实现时, 我们需要考虑下面这些:

// ; 1.有3盏灯, 需要3个位置来放, 意味着房子的数量 >=4 才能放下。
// ; 2.因为有3盏灯，直径的最大值是最右侧房子和最左侧房子坐标之差的1/3，因此右指针初始化为right = (nums[N-1] - nums[0]) / 3
// ; 3.枚举直径d, 如果当前直径mid可以覆盖所有的房子(canCoverAll == true)，那么当前mid可能偏大，也可能就是最小直径，令 right= mid - 1(如果确实偏大就丢弃了，如果确实是最小直径那循环会停止，left就是最小直径，返回left / 2)
// ; 4.如果当前直径mid不可以覆盖所有房子(canCoverAll == false)，那么当前mid偏小，增大mid，left = mid + 1
// ; 5.此时, 我们找到了最小直径left, 而所求的最小半径即为left的一半。


// https://binarysearch.com/problems/Minimum-Light-Radius

// Example 1
// Input
// nums = [3, 4, 5, 6]
// Output
// 0.5
// Explanation
// If we place the lamps on 3.5, 4.5 and 5.5 then with r = 0.5 we can light up all 4 houses.


function solve(nums) {
  if (nums.length < 3) return 0
  nums.sort((a, b) => a - b)
  let l = 0, r = nums[nums.length - 1]
  while (l <= r) {
    const m = l + ((r - l) >>> 1)

    if (find(m, nums)) r = m - 1
    else l = m + 1
  }
  if (l > nums[nums.length - 1] || !find(l, nums)) return -1
  return l / 2
}

function find(mid, nums) {
  let range = nums[0] + mid, ligths = 0

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > range) {
      ligths += 1
      range = nums[i] + mid
    }
  }

  return ligths <= 2
}