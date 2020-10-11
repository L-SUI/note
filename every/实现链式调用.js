// 实现链式调用

class Ergodic {
    constructor(){
        this.message='';
    }
    say (str) {
        this.message+=str;
        console.log(this.message);
        return this
    }
}
let ergodic = new Ergodic();
ergodic
    .say("手握日月摘星辰，")
    .say("世间无我这般人。")
    .say("天不生我李淳罡，")
    .say("剑道万古如长夜。");