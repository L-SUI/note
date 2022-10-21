# 使用 rem 布局的优缺点？

```text
优点：
在屏幕分辨率千差万别的时代，只要将rem与屏幕分辨率关联起来就可以实现页面的整体缩放，使得在设备上的展现都统一起来了。
而且现在浏览器基本都已经支持rem了，兼容性也非常的好。

缺点：
（1）在奇葩的dpr设备上表现效果不太好，比如一些华为的高端机型用rem布局会出现错乱。
（2）使用iframe引用也会出现问题。
（3）rem在多屏幕尺寸适配上与当前两大平台的设计哲学不一致。即大屏的出现到底是为了看得又大又清楚，还是为了看的更多的问
题。
```

详细资料可以参考：

- [《css3 的字体大小单位 rem 到底好在哪？》 (opens new window)](https://www.zhihu.com/question/21504656)
- [《VW:是时候放弃 REM 布局了》 (opens new window)](https://www.jianshu.com/p/e8ae1c3861dc)
- [《为什么设计稿是 750px》 (opens new window)](https://blog.csdn.net/Honeymao/article/details/76795089)
- [《使用 Flexible 实现手淘 H5 页面的终端适配》](https://github.com/amfe/article/issues/17)