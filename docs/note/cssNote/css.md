# CSS workFlow
## CSS预处理器

![34FE6B33-80CE-450B-AEF4-E7854CBC37A5](/cssNote/34FE6B33-80CE-450B-AEF4-E7854CBC37A5.jpg)

### 预处理器的变革

![A1A1201B-802A-4D1B-B46E-32A93C3E72A9](/cssNote/A1A1201B-802A-4D1B-B46E-32A93C3E72A9.jpg)

### 常用规范

- 变量
- 混合(Mixin) Extend
- 嵌套规则
- 运算
- 函数
- Namespaces & Accesorrs
- scope

- 注释

## CSS后处理器

- css压缩 CLEAN-CSS
- 自动添加浏览器前缀Autoprefixer
- css更加美观的排序CSScomd
- Rework取代Stylus后处理器发热
- 前后通吃的PostCSS



![9645C171-437C-4C81-85E7-BC85EC1BBC49](/cssNote/9645C171-437C-4C81-85E7-BC85EC1BBC49.jpg)

### css变量

![1597073331237_72B7AFE5-FA97-46DF-949D-41D5267FF01A](/cssNote/1597073331237_72B7AFE5-FA97-46DF-949D-41D5267FF01A.png)

[cssnext](https://cssnext.github.io/playground/)**早期的css变量使用**

![E8C1EA9E-C7DC-433F-8337-0ECF1314F20B](/cssNote/E8C1EA9E-C7DC-433F-8337-0ECF1314F20B.jpg)

![BD75971D-27FB-4660-884B-DEB75B79D19A](/cssNote/BD75971D-27FB-4660-884B-DEB75B79D19A.jpg)

**现阶段浏览器的支持：**[css变量](http://preset-env.cssdb.org/)

![7409B35B-DB63-44FE-BEB4-664532D378C4](/cssNote/7409B35B-DB63-44FE-BEB4-664532D378C4.jpg)

![1597074113648_373EDBB7-0596-4415-9728-CC00B8DB4174](/cssNote/1597074113648_373EDBB7-0596-4415-9728-CC00B8DB4174.png)

![1597074179305_6DA28FC7-9671-400C-83B4-340FD51BFFD1](/cssNote/1597074179305_6DA28FC7-9671-400C-83B4-340FD51BFFD1.png)

### POSTCSS值得收藏的插件

| POSTCSS-CUSTOM-PROPERTIES |         运行时变量         |
| :-----------------------: | :------------------------: |
|    POSTCSS-SIMPLE-VARS    |    与scss一致的变量实现    |
|      POSTCSS-MIXINS       | 实现类似SASS的@MIXIN的功能 |
|      POSTCSS-EXTEND       |   实现类似SASS的继承功能   |
|      POSTCSS-IMPORT       |    实现类似SASS的IMPORT    |
|          CSSNext          |          面向未来          |
|         CSS Grace         |          修复过去          |

![AC39BCF5-B378-4A06-ACB5-E9FE45550C5B](/cssNote/AC39BCF5-B378-4A06-ACB5-E9FE45550C5B.jpg)

### css-doodle

**一个简单的demo**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        :root {
            --customUnit: 100%;
        }
        @supports(display: flex){
            html,body {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        body {
            width: var(--customUnit);
            height: var(--customUnit);
            background:#666;
            position: absolute;
            bottom: 0;
            top: 0;
        }
        
    </style>
    <script src="https://unpkg.com/css-doodle@0.8.5/css-doodle.min.js"></script>
</head>
<body>
    

    <css-doodle>
        :doodle {@grid: 1 x 10 /50vmax;}
        @size: calc( @index() * 10%) ;
        @place-cell: center;
        border-width: calc( @index() * 1vmin);
        border-style: dashed;
        border-radius: 50% ;
        border-color:hsla(calc(20*@index()), 70%, 60%, calc(3/@index()*.8));
        --d:@rand(30s,50s);
        --rf:@rand(360deg);
        --rt:calc(var(--rf))+@pick(1turn,-1turn);
        animation: spin var(--d) cubic-bezier(.34,.79,.6,.23) infinite;
        @keyframes spin {
            from {
                transform: rotate(var(--rf));
            }
            to {
                transform: rotate(var(--rt));
            }
        }
    </css-doodle>
</body>
</html>
```

[css-doodle](https://css-doodle.com/)

### 贝塞尔曲线

[贝塞尔曲线](https://cubic-bezier.com)

## 未完待续

