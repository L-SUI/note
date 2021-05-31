# 工厂模式



## **工厂模式**定义

**工厂方法模式**（英语：**Factory method pattern**）是一种实现了“工厂”概念的[面向对象](https://zh.wikipedia.org/wiki/面向对象)[设计模式](https://zh.wikipedia.org/wiki/设计模式_(计算机))。就像其他[创建型模式](https://zh.wikipedia.org/wiki/創建型模式)一样，它也是处理在不指定[对象](https://zh.wikipedia.org/wiki/对象_(计算机科学))具体[类型](https://zh.wikipedia.org/wiki/类_(计算机科学))的情况下创建对象的问题。工厂方法模式的实质是“定义一个创建对象的接口，但让实现这个接口的类来决定实例化哪个类。工厂方法让类的实例化推迟到子类中进行。”[[1\]](https://zh.wikipedia.org/zh-hans/工厂方法#cite_note-1)

创建一个对象常常需要复杂的过程，所以不适合包含在一个复合对象中。创建对象可能会导致大量的重复代码，可能会需要复合对象访问不到的信息，也可能提供不了足够级别的抽象，还可能并不是复合对象概念的一部分。工厂方法模式通过定义一个单独的创建对象的方法来解决这些问题。由[子类](https://zh.wikipedia.org/wiki/子类)实现这个方法来创建具体类型的对象。

对象创建中的有些过程包括决定创建哪个对象、管理对象的生命周期，以及管理特定对象的建立和销毁的概念。

在[面向对象程序设计](https://zh.wikipedia.org/wiki/面向对象的程序设计)中，**工厂**通常是一个用来创建其他对象的对象。工厂是[构造方法](https://zh.wikipedia.org/wiki/構造方法)的[抽象](https://zh.wikipedia.org/wiki/抽象化_(計算機科學))，用来实现不同的分配方案。

## 抽象工厂模式定义

**抽象工厂模式**（英语：**Abstract factory pattern**）是一种软件开发[设计模式](https://zh.wikipedia.org/wiki/设计模式_(计算机))。抽象工厂模式提供了一种方式，可以将一组具有同一主题的单独的[工厂](https://zh.wikipedia.org/wiki/工厂方法)封装起来。在正常使用中，客户端程序需要创建抽象工厂的具体实现，然后使用抽象工厂作为[接口](https://zh.wikipedia.org/w/index.php?title=接口_(资讯科技)&action=edit&redlink=1)来创建这一主题的具体对象。客户端程序不需要知道（或关心）它从这些内部的工厂方法中获得对象的具体类型，因为客户端程序仅使用这些对象的通用接口。抽象工厂模式将一组对象的实现细节与他们的一般使用分离开来。

举个例子来说，比如一个抽象工厂类叫做`DocumentCreator`（文档创建器），此类提供创建若干种产品的接口，包括`createLetter()`（创建信件）和`createResume()`（创建简历）。其中，`createLetter()`返回一个`Letter`（信件），`createResume()`返回一个`Resume`（简历）。系统中还有一些`DocumentCreator`的具体实现类，包括`FancyDocumentCreator`和`ModernDocumentCreator`。这两个类对`DocumentCreator`的两个方法分别有不同的实现，用来创建不同的“信件”和“简历”（用`FancyDocumentCreator`的实例可以创建`FancyLetter`和`FancyResume`，用`ModernDocumentCreator`的实例可以创建`ModernLetter`和`ModernResume`）。这些具体的“信件”和“简历”类均继承自[抽象类](https://zh.wikipedia.org/w/index.php?title=抽象类&action=edit&redlink=1)，即`Letter`和`Resume`类。客户端需要创建“信件”或“简历”时，先要得到一个合适的`DocumentCreator`实例，然后调用它的方法。一个工厂中创建的每个对象都是同一个主题的（“fancy”或者“modern”）。客户端程序只需要知道得到的对象是“信件”或者“简历”，而不需要知道具体的主题，因此客户端程序从抽象工厂`DocumentCreator`中得到了`Letter`或`Resume`类的引用，而不是具体类的对象引用。

“工厂”是创建产品（对象）的地方，其目的是将产品的创建与产品的使用分离。抽象工厂模式的目的，是将若干抽象产品的接口与不同主题产品的具体实现分离开。这样就能在增加新的具体工厂的时候，不用修改引用抽象工厂的客户端代码。

使用抽象工厂模式，能够在具体工厂变化的时候，不用修改使用工厂的客户端代码，甚至是在[运行时](https://zh.wikipedia.org/wiki/运行时)。然而，使用这种模式或者相似的设计模式，可能给编写代码带来不必要的复杂性和额外的工作。正确使用设计模式能够抵消这样的“额外工作”。

**抽象工厂模式的实质是“提供接口，创建一系列相关或独立的对象，而不指定这些对象的具体类。**

上述摘自`维基百科`

## 精简一点

工厂模式使我们最常用的实例化对象的模式了，是用工厂方法代替new操作的一种模式。注明的`Jive`论坛，就大量使用了工厂模式，工厂模式在`Java`程序系统可以说是随处可见。因为工厂模式就相当于创建实例对象的`new`，我们将长要根据类`class`生成实例对象，如a=new A()工厂模式也是用来创建实例对象的，所以在创建多个实例时可以考虑使用工厂模式，虽然这样做可能会多一些工作，但是会给系统带来更大的可扩展性和尽量少的修改量。

## 上代码

```typescript
/*
 * @Descripttion: 
 * @version: 
 * @Author: memory
 * @Date: 2020-10-23 21:10:34
 * @LastEditors: memory
 * @LastEditTime: 2021-05-31 23:30:25
 */
abstract class INooles {
  //描述每种面条啥样
  public abstract desc(): void;
}

class LzNoodeles extends INooles {
  public desc(): void {
    console.log('兰州拉面 北京好贵 家里才几块');
  }
}

class PaoNoodles extends INooles {
  public desc(): void {
    console.log('泡面好吃 但是不要多吃哦');
  }
}

class GankouNoodles extends INooles {
  public desc(): void {
    console.log('武汉热干面');
  }
}

class SimpleNoodlesFactory {
  public static TYPE_LZ: number = 1;
  public static TYPE_PM: number = 2;
  public static TYPE_GK: number = 3;
  public static createNoodles(type: number): INooles {
    switch (type) {
      case SimpleNoodlesFactory.TYPE_LZ:
        return new LzNoodeles();
      case SimpleNoodlesFactory.TYPE_PM:
        return new PaoNoodles();
      //switch贯穿
      case SimpleNoodlesFactory.TYPE_GK:
      default:
        return new GankouNoodles();
    }
  }
}

const noodles: INooles = SimpleNoodlesFactory.createNoodles(
  SimpleNoodlesFactory.TYPE_GK
);

noodles.desc();
```

