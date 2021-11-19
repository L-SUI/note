// 已知一个 NxN 的国际象棋棋盘，棋盘的行号和列号都是从 0 开始。即最左上角的格子记为 (0, 0)，最右下角的记为 (N-1, N-1)。 

// 现有一个 “马”（也译作 “骑士”）位于 (r, c) ，并打算进行 K 次移动。 

// 如下图所示，国际象棋的 “马” 每一步先沿水平或垂直方向移动 2 个格子，然后向与之相垂直的方向再移动 1 个格子，共有 8 个可选的位置。

//  



//  

// 现在 “马” 每一步都从可选的位置（包括棋盘外部的）中独立随机地选择一个进行移动，直到移动了 K 次或跳到了棋盘外面。

// 求移动结束后，“马” 仍留在棋盘上的概率。

//  

// 示例：

// 输入: 3, 2, 0, 0
// 输出: 0.0625
// 解释: 
// 输入的数据依次为 N, K, r, c
// 第 1 步时，有且只有 2 种走法令 “马” 可以留在棋盘上（跳到（1,2）或（2,1））。对于以上的两种情况，各自在第2步均有且只有2种走法令 “马” 仍然留在棋盘上。
// 所以 “马” 在结束后仍在棋盘上的概率为 0.0625。
//  

// 注意：

// N 的取值范围为 [1, 25]
// K 的取值范围为 [0, 100]
// 开始时，“马” 总是位于棋盘上


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/knight-probability-in-chessboard
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




function knightProbability(n: number, k: number, row: number, column: number): number {
    const dirs = [[-1, -2], [-2, -1], [1, 2], [2, 1], [-1, 2], [2, -1], [-2, 1], [1, -2]];
    // cache[i][j][step]表示在step步时位于i,j位置仍在棋盘的概率
    const cache = new Array(n).fill(0).map(() => new Array(n).fill(0).map(() => new Array(k + 1).fill(-1)));
    const dfs = (i: number, j: number, step: number) => {
        if (i < 0 || i >= n || j < 0 || j >= n) {
            // 出界，概率为0
            return 0;
        }
        if (step === 0) {
            // 最后一步仍未出界，概率为1
            return 1;
        }
        if (cache[i][j][step] !== -1) {
            // 有缓存的结果，直接返回
            return cache[i][j][step];
        }
        let sum = 0;
        for (let dir of dirs) {
            const [x, y] = dir;
            sum += dfs(i + x, j + y, step - 1);
        }
        // 在step步数时当前位置的概率和除以总数即是当前位置的概率
        cache[i][j][step] = sum / dirs.length;
        return cache[i][j][step];
    }
    return dfs(row, column, k);
};
