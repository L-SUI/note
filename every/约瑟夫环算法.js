// 用链表实现约瑟夫环算法

// 假设有n个人，标号为1到n。
// 从第一个人开始计数，到第k个人则出列，随后从第k+1个人重新计数，到第k再出列....。
// 直至剩下最后一个人。问最后剩下的人的编号？


function cir (node,k){
    let n = 11;
    // while (node) (node=node.next,n++)
    let p=0;
	for(let i=2;i<=n;i++)
	{
		p=(p+k)%i;
	}
	return p+1;
}

console.log(cir(null,3))