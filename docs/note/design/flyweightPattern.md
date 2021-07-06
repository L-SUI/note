# 享元模式

**享元模式(Flyweight Pattern)**：运用共享技术有效地支持大量细粒度对象的复用。系统只使用少量的对象，而这些对象都很相似，状态变化很小，可以实现对象的多次复用。由于享元模式要求能够共享的对象必须是细粒度对象，因此它又称为轻量级模式，它是一种对象结构型模式。享元模式结构较为复杂，一般结合工厂模式一起使用。

![flyweight-zh-2x](/design/flyweight-zh-2x.png)

## 参照

- 函数柯里化

- 有男女衣服各50套，现在要给这些衣服拍照怎么办呢？ 土豪做法：new 100个模特对象一人穿一套慢慢拍，有钱任性（内存占有率高） 理性做法：new 一个男模特和一个女模特拍完一套换一套接着拍（暴露一个换衣服的接口）， 也没差，主要是省钱（对象从100个减少为2个）
- 在围棋中，棋子就是大量细粒度的对象。其属性有内在的，比如颜色、形状等，也有外在的，比如在棋盘上的位置。内在的属性是可以共享的，区分在于外在属性。因此，只需定义两个棋子的对象，一颗黑棋和一颗白棋，黑棋和白棋包含棋子的内在属性；棋子的外在属性，即在棋盘上的位置可以提取出来，存放在单独的容器中。整个系统中只有一颗黑棋和一颗白棋，大大减少了对空间的需求



## 享元模式优缺点

享元模式的优点：

A、享元模式的优点在于可以极大减少内存中对象的数量，使得相同对象或相似对象在内存中只保存一份。

B、享元模式的外部状态相对独立，而且不会影响其内部状态，从而使得享元对象可以在不同的环境中被共享。

享元模式的缺点：

A、享元模式使得系统更加复杂，需要分离出内部状态和外部状态，使得程序的逻辑复杂化。

B、为了使对象可以共享，享元模式需要将享元对象的状态外部化，而读取外部状态使得运行时间变长。

## 实现

Flyweight： 享元接口，通过这个接口传入外部状态并作用于外部状态；
　ConcreteFlyweight： 具体的享元实现对象，必须是可共享的，需要封装享元对象的内部状态；
　UnsharedConcreteFlyweight： 非共享的享元实现对象，并不是所有的享元对象都可以共享，非共享的享元对象通常是享元对象的组合对象；
　FlyweightFactory： 享元工厂，主要用来创建并管理共享的享元对象，并对外提供访问共享享元的接口；

```typescript
//享元模式
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



## 文章推荐

- [享元模式](https://refactoringguru.cn/design-patterns/flyweight)
- [设计模式（十三）——享元模式](https://www.huaweicloud.com/articles/ab1f45d39fce4a7a029dfd80f123269c.html)

