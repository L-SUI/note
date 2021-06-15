# 享元模式

**享元模式**（英语：Flyweight Pattern）是一种软体[设计模式](https://zh.wikipedia.org/wiki/设计模式_(计算机))。它使用物件用来尽可能减少记忆体使用量；于相似物件中分享尽可能多的资讯。当大量物件近乎重复方式存在，因而使用大量记忆体时，此法适用。通常物件中的部分状态(state)能够共享。常见做法是把它们放在资料结构外部，当需要使用时再将它们传递给享元。

典型的享元模式的例子为[文书处理器](https://zh.wikipedia.org/wiki/文書處理器)中以图形结构来表示字符。一个做法是，每个[字形](https://zh.wikipedia.org/wiki/字形)有其字型外观, 字模 metrics, 和其它格式资讯，但这会使每个字符就耗用上千位元组。取而代之的是，每个字符参照到一个共享字形物件，此物件会被其它有共同特质的字符所分享；只有每个字符（文件中或页面中）的位置才需要另外储存。

## 参照

函数柯里化





## 实现

```typescript
//享元模式 SOLID
interface Shape {
  draw(): void;
}
//创建实现接口的实体类
class Circle implements Shape {
  private color: string;
  private x: number = 0;
  private y: number = 0;
  private radius: number = 0;

  constructor(color: string) {
    this.color = color;
  }

  public setX(x: number): void {
    this.x = x;
  }

  public setY(y: number): void {
    this.y = y;
  }

  public setRadius(radius: number): void {
    this.radius = radius;
  }

  public draw(): void {
    console.log(
      'Circle: Draw() [Color : ' +
        this.color +
        ', x : ' +
        this.x +
        ', y :' +
        this.y +
        ', radius :' +
        this.radius
    );
  }
}

//创建一个工厂，生成基于给定信息的实体类的对象。
class ShapeFactory {
  private static circleMap = new Map<string, Shape>();

  public static getCircle(color: string): Shape {
    let circle: Circle = <Circle>this.circleMap.get(color);

    if (circle == null) {
      circle = new Circle(color);
      this.circleMap.set(color, circle);
      console.log('创建了圆🐻🐻🐻🐻🐻 : ' + color);
    }
    return circle;
  }
}

//使用该工厂，通过传递颜色信息来获取实体类的对象。
// 圆的类 -> 黑圆、蓝色圆
// const x = curry("color)
// x(x,y)
// x(x1,y1)

class FlyweightPatternDemo {
  private static colors: string[] = ['Red', 'Green', 'Blue', 'White', 'Black'];
  constructor() {
    for (let i = 0; i < 20; ++i) {
      const circle: Circle = <Circle>(
        ShapeFactory.getCircle(FlyweightPatternDemo.getRandomColor())
      );
      circle.setX(FlyweightPatternDemo.getRandomX());
      circle.setY(FlyweightPatternDemo.getRandomY());
      circle.setRadius(100);
      circle.draw();
    }
  }
  private static getRandomColor(): string {
    return this.colors[Math.ceil(Math.random() * (this.colors.length - 1))];
  }
  private static getRandomX(): number {
    return Math.random() * 100;
  }
  private static getRandomY(): number {
    return Math.random() * 100;
  }
}

new FlyweightPatternDemo();
```

