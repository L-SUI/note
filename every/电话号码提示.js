// 标题：输入电话号码时自动推荐出下一位合法的数字集
// 描述信息
// 公司有10万名员工，每名员工都有一个座机号码。现在要在网页上实现一个“自动补位推荐” 的功能，问如何实现？

// 解释：

// “自动补位推荐” 功能：有一个输入框，用户每输入一个数字，立马推荐出下一位合法的数字集合。
// 比如只有 三个电话号码，当第一位输入5时，立马推荐下一位有效数字集合[ 7, 6 ]，
// 如果第二位输入6时，下一位有效数字集合为[2，3]....


class returnPhoneList {
    constructor(arr){
        this.map = {};
        arr.forEach(item=>{
            let current = this.map;
            for(let i=0; i<item.length; i++){
                current[item[i]]= current[item[i]]?current[item[i]]:{};
                current = current[item[i]]
            }
        });
    }
    getPhoneList(num){
        let current = this.map;
        for(let i=0; i<num.length; i++){
            if(current[num[i]]) current = current[num[i]]
            else return [];
        }
        return Object.keys(current)
    }
}

const map = new returnPhoneList(['5789234','5623786','5633678']);
console.log(map.getPhoneList('56'));
console.log(map.getPhoneList('57'));