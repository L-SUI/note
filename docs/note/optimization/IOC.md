# 面向切面的编程思想

![3A5A986B-CC9B-4037-A9A1-853987BE1E26](/automation/3A5A986B-CC9B-4037-A9A1-853987BE1E26.jpg)

## SOLID

### 简介

面向对象设计原则之一：单一功能、开闭原则、里氏替换、接口隔离以及依赖反转

程序设计领域， SOLID (单一功能、开闭原则、里氏替换、接口隔离以及依赖反转)是由罗 伯特·C·⻢丁在21世纪早期 引入的记忆术首字母缩略字，指代了面向对象编程和面向对象设计 的五个基本原则。当这些原则被一起应用时，它们使得一个程序员开发一个容易进行软件维护 和扩展的系统变得更加可能SOLID被典型的应用在测试驱动开发上，并且是敏捷开发以及自适 应软件开发的基本原则的重要组成部分。

### [S] 单一功能原则

单一功能原则 :单一功能原则 认为对象应该仅具有一种单一功能的概念。 换句话说就是**让一个类只做一种类型责任**，当这个类需要承担其他类型的责任的时候，就需 要分解这个类。在所有的SOLID原则中，这是大多数开发人员感到最能完全理解的一条。严 格来说，这也可能是违反最频繁的一条原则了。单一责任原则可以看作是低耦合、高内聚在 面向对象原则上的引申，将责任定义为引起变化的原因，以提高内聚性来减少引起变化的原 因。责任过多，可能引起它变化的原因就越多，这将导致责任依赖，相互之间就产生影响， 从而极大的损伤其内聚性和耦合度。单一责任，通常意味着单一的功能，因此不要为一个模 块实 现过多的功能点，以保证实体只有一个引起它变化的原因。

```js
//Bad
class UserSettings {
    constructor(user) {
        this.user = user;
    }

    changeSettings(settings) {
        if (this.verifyCredentials()) {
            // ...
        }
    }

    verifyCredentials() {
        // ...
    }
}
//Good:
class UserAuth {
    constructor(user) {
        this.user = user;
    }
    verifyCredentials() {
        // ...
    }
}

class UserSetting {
    constructor(user) {
        this.user = user;
        this.auth = new UserAuth(this.user);
    }
    changeSettings(settings) {
        if (this.auth.verifyCredentials()) {
            // ...
        }
    }
}
}
```

```csharp
namespace SOLID
{
    public class Users
    {
        /// <summary>
        /// 支付
        /// </summary>
        public void Pay(){}

        /// <summary>
        /// 数据库操作
        /// </summary>
        public void DataAccess(){}

        /// <summary>
        /// 日志操作
        /// </summary>
        public void Logger(){}
    }
}
//1.在这个用户类中有这三个功能：1.支付逻辑，2数据库逻辑，3.日志操作。
//2.如果将这三个功能结合在一个类中，可能会出现修改部分代码时会破坏其他的部分。
//3.多个功能也使这个用户类难以理解，降低了内聚性。所以最好就是将这个类分离为三个分离的类，每个类仅仅有一个功能。
namespace SOLID
{
    /// <summary>
    /// 数据库操作
    /// </summary>
    class DataAccess { }

    /// <summary>
    /// 日志
    /// </summary>
    class Logger { }

    /// <summary>
    /// 支付
    /// </summary>
    class Pay { }
}

```

### [O] 开闭原则

开闭原则(ocp) 认为“软件体应该是对于扩展开放的，但是对于修改封闭的”的概念。 软件实体应该是可扩展，而不可修改的。也就是说，**对扩展是开放的，而对修改是封闭 的(“开”指的就是类、模块、函数都应该具有可扩展性，“闭”指的是它们不应该被修 改。也就是说你可以新增功能但不能去修改源码。**)。这个原则是诸多面向对象编程原 则中最抽象、最难理解的一个。

 对扩展开放，意味着有新的需求或变化时，可以对现有代码进行扩展，以适应新的情 况。对修改封闭，意味着类一旦设计完成，就可以独立完成其工作，而不要对类进行任 何修改。可以使用变化和不变来说明:封装不变部分，开放变化部分，一般使用接口继 承实现方式来实现“开放”应对变化，说大白话就是:你不是要变化吗?，那么我就让你 继承实现一个对象，用一个接口来抽象你的职责，你变化越多，继承实现的子类就越 多。

```js
//Bad:
class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'ajaxAdapter';
  }
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'nodeAdapter';
  }
}

class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }

  fetch(url) {
    if (this.adapter.name === 'ajaxAdapter') {
      return makeAjaxCall(url).then((response) => {
        // 传递 response 并 return
      });
    } else if (this.adapter.name === 'httpNodeAdapter') {
      return makeHttpCall(url).then((response) => {
        // 传递 response 并 return
      });
    }
  }
}

function makeAjaxCall(url) {
  // 处理 request 并 return promise
}

function makeHttpCall(url) {
  // 处理 request 并 return promise
}
//Good:
class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'ajaxAdapter';
  }

  request(url) {
    // 处理 request 并 return promise
  }
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'nodeAdapter';
  }

  request(url) {
    // 处理 request 并 return promise
  }
}

class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }

  fetch(url) {
    return this.adapter.request(url).then((response) => {
      // 传递 response 并 return
    });
  }
}

```

```csharp
//abstract修饰的类，叫做抽象类，是不允许实例化的类，
//不能直接创建对象，必须要通过子类创建才能使用abstract类的方法。
abstract class DataAccess
{
    public abstract void OpenConnection();
    public abstract void CloseConnection();
    public abstract void ExecuteCommand();
}

/// <summary>
/// SQL
/// </summary>
class SqlDataAccess : DataAccess
{
    /// <summary>
    /// 打开SQL数据库
    /// </summary>
    public override void OpenConnection() { }
    /// <summary>
    /// 关闭Sql数据连接
    /// </summary>
    public override void CloseConnection() { }
    /// <summary>
    /// 执行Sql数据命令
    /// </summary>
    public override void ExecuteCommand() { }
}

/// <summary>
/// ORACLE
/// </summary>
class OracleDataAccess : DataAccess
{
    /// <summary>
    /// 打开Oracle数据连接
    /// </summary>
    public override void OpenConnection() { }
    /// <summary>
    /// 关闭Oracle数据连接
    /// </summary>
    public override void CloseConnection() { }
    /// <summary>
    /// 执行Oracle数据命令
    /// </summary>
    public override void ExecuteCommand() { }
}
```

### [L] 里氏替换原则

里氏替换原则 :里氏替换原则 认为“程序中的对象应该是可以在不改变程序正确性的前提下被它的子类所替换的” 的概念。 

**子类必须能够替换成它们的基类**。即:子类应该可以替换任何基类能够出现的地方，并且经过替换以后，代码还 能正常工作。另外，不应该 在代码中出现if/else之类对子类类型进行判断的条件。里氏替换原则LSP是使代码符 合开闭原则的一个重要保证。正是由于子类型的可替换性才使得父类 型的模块在无需修改的情况下就可以扩展。 在很多情况下，在设计初期我们类之间的关系不是很明确，LSP则给了我们一个判断和设计类之间关系的基准: 需不需 要继承，以及怎样设计继承关系。 

当一个子类的实例应该能够替换任何其超类的实例时，它们之间才具有is-A关系。继承对于OCP，就相当于多态 性对于里氏替换原则。子类可以代替基类，客户使用基类，他们不需要知道派生类所做的事情。这是一个针对行 为职责可替代的原则，如果S是T的子类型，那么S对象就应该在不改变任何抽象属性情况下替换所有T对象。

```js
//Bad:
// 长方形
class Rectangle {
  constructor() {
    this.width = 0;
    this.height = 0;
  }

  setColor(color) {
    // ...
  }

  render(area) {
    // ...
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

// 正方形
class Square extends Rectangle {
  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.width = height;
    this.height = height;
  }
}

function renderLargeRectangles(rectangles) {
  rectangles.forEach((rectangle) => {
    rectangle.setWidth(4);
    rectangle.setHeight(5);
    const area = rectangle.getArea(); 
    rectangle.render(area);
  });
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);
//===============================================================
//Good
class Shape {
  setColor(color) {
    // ...
  }

  render(area) {
    // ...
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(length) {
    super();
    this.length = length;
  }

  getArea() {
    return this.length * this.length;
  }
}

function renderLargeShapes(shapes) {
  shapes.forEach((shape) => {
    const area = shape.getArea();
    shape.render(area);
  });
}

const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)];
renderLargeShapes(shapes);

```

```csharp
class Rectangle
{
    protected int width = 0;
    protected int height = 0;
    public virtual void SetWidth(int width)
    {
        this.width = width;
    }
    public virtual void SetHeight(int height)
    {
        this.height = height;
    }
    public virtual int GetArea()
    {
        return this.width * this.height;
    }
}
class Square : Rectangle
{
    public override void SetHeight(int height)
    {
        this.height = height;
        this.width = height;
    }
    public override void SetWidth(int width)
    {
        this.height = width;
        this.width = width;
    }
}
```

### [I] 接口隔离原则

接口隔离原则 :接口隔离原则 认为“多个特定客户端接口要好于一个宽泛用途的接口”的概念。 不能强迫用户去依赖那些他们不使用的接口。换句话说，**使用多个专⻔的接口比使用单一的总接口 总要好(JavaScript 几乎没有接口的概念所以使用ts)**。注意:在代码中应用ISP并不一定意味着服务 就是绝对安全的。仍然需要采用良好的编码实践，以确保正确的验证与授权。 

这个原则起源于施乐公司，他们需要建立了一个新的打印机系统，可以执行诸如装订的印刷品一 套，传真多种任务。此系统软件创建从底层开始编制，并实现了这些 任务功能，但是不断增⻓的软 件功能却使软件本身越来越难适应变化和维护。每一次改变，即使是最小的变化，有人可能需要近 一个小时的重新编译和重新部署。这 是几乎不可能再继续发展，所以他们聘请罗伯特Robert帮助他 们。他们首先设计了一个主要类Job,几乎能够用于实现所有任务功能。只要调用Job类的 一个方法 就可以实现一个功能，Job类就变动非常大，是一个胖模型啊，对于客户端如果只需要一个打印功 能，但是其他无关打印的方法功能也和其耦合，ISP 原则建议在客户端和Job类之间增加一个接口 层，对于不同功能有不同接口，比如打印功能就是Print接口，然后将大的Job类切分为继承不同接 口的子 类，这样有一个Print Job类，等等。

```js
//Bad:
class DOMTraverser {
  constructor(settings) {
    this.settings = settings;
    this.setup();
  }

  setup() {
    this.rootNode = this.settings.rootNode;
    this.animationModule.setup();
  }

  traverse() {
    // ...
  }
}

const $ = new DOMTraverser({
  rootNode: document.getElementsByTagName('body'),
  animationModule() {} // Most of the time, we won't need to animate when traversing.
  // ...
});
//Good:
class DOMTraverser {
  constructor(settings) {
    this.settings = settings;
    this.options = settings.options;
    this.setup();
  }

  setup() {
    this.rootNode = this.settings.rootNode;
    this.setupOptions();
  }

  setupOptions() {
    if (this.options.animationModule) {
      // ...
    }
  }

  traverse() {
    // ...
  }
}

const $ = new DOMTraverser({
  rootNode: document.getElementsByTagName('body'),
  options: {
    animationModule() {}
  }
});
```

```csharp
interface IDataAccess
    {
        void OpenConnection();
        void CloseConnection();
    }

    interface ISqlDataAccess : IDataAccess
    {
        void ExecuteSqlCommand();
    }
    interface IOracleDataAccess : IDataAccess
    {
        void ExecuteOracleCommand();
    }
    class SqlDataAccess : ISqlDataAccess
    {
        /// <summary>
        /// 执行Sql数据命令
        /// </summary>
        public void ExecuteSqlCommand(){}

        /// <summary>
        /// 打开Sql数据连接
        /// </summary>
        public void OpenConnection(){}

        /// <summary>
        /// 关闭Sql数据连接
        /// </summary>
        public void CloseConnection(){}
    }
    class OracleDataAccess : IOracleDataAccess
    {
        /// <summary>
        /// 执行Oracle数据命令
        /// </summary>
        public void ExecuteOracleCommand(){}

        /// <summary>
        /// 打开Oracle数据连接
        /// </summary>
        public void OpenConnection(){}

        /// <summary>
        /// 关闭Oracle数据连接
        /// </summary>
        public void CloseConnection(){}
    }
```

## DI

在[软件工程](https://zh.wikipedia.org/wiki/軟件工程)中，**依赖注入**（dependency injection）的意思为，给予调用方它所需要的事物。 “依赖”是指可被方法调用的事物。依赖注入形式下，调用方不再直接指使用“依赖”，取而代之是“注入” 。“注入”是指将“依赖”传递给调用方的过程。在“注入”之后，调用方才会调用该“依赖”[[1\]](https://zh.wikipedia.org/wiki/依赖注入#cite_note-1)。传递依赖给调用方，而不是让让调用方直接获得依赖，这个是该设计的根本需求。

注：编程语言层次下，“调用方”为对象和类，“依赖”为变量。在提供服务的角度下，“调用方”为客户端，“依赖”为服务。

该设计的目的是为了[分离关注点](https://zh.wikipedia.org/wiki/分离关注点)，分离调用方和依赖，从而提高可读性以及[代码重用性](https://zh.wikipedia.org/wiki/代码复用)。

依赖注射是[控制反转](https://zh.wikipedia.org/wiki/控制反转)的最为常见的一种技术。

| [设计模式](https://zh.wikipedia.org/wiki/设计模式：可复用面向对象软件的基础) | [创建型](https://zh.wikipedia.org/wiki/創建型模式) [抽象工厂](https://zh.wikipedia.org/wiki/抽象工厂)  [生成器](https://zh.wikipedia.org/wiki/生成器模式) [工厂方法](https://zh.wikipedia.org/wiki/工厂方法) [惰性初始](https://zh.wikipedia.org/wiki/惰性初始模式) [原型](https://zh.wikipedia.org/wiki/原型模式) [单例](https://zh.wikipedia.org/wiki/单例模式)<br />[结构型：](https://zh.wikipedia.org/wiki/結構型模式) [适配器](https://zh.wikipedia.org/wiki/适配器模式) [桥接](https://zh.wikipedia.org/wiki/橋接模式) [Composite](https://zh.wikipedia.org/w/index.php?title=Composite&action=edit&redlink=1) [修饰](https://zh.wikipedia.org/wiki/修饰模式) [外观](https://zh.wikipedia.org/wiki/外觀模式) [享元](https://zh.wikipedia.org/wiki/享元模式) [代理](https://zh.wikipedia.org/wiki/代理模式)<br />[行为型：](https://zh.wikipedia.org/wiki/行為型模式)[责任链](https://zh.wikipedia.org/wiki/责任链模式) [命令](https://zh.wikipedia.org/wiki/命令模式) [Interpreter](https://zh.wikipedia.org/w/index.php?title=Interpreter_pattern&action=edit&redlink=1) [迭代器](https://zh.wikipedia.org/wiki/迭代器模式) [Mediator](https://zh.wikipedia.org/w/index.php?title=Mediator&action=edit&redlink=1) [Memento](https://zh.wikipedia.org/w/index.php?title=Memento&action=edit&redlink=1) [观察者](https://zh.wikipedia.org/wiki/观察者模式) [Specification](https://zh.wikipedia.org/w/index.php?title=Specification&action=edit&redlink=1) [State](https://zh.wikipedia.org/w/index.php?title=State&action=edit&redlink=1) [策略](https://zh.wikipedia.org/wiki/策略模式) [模板方法](https://zh.wikipedia.org/wiki/模板方法) [访问者](https://zh.wikipedia.org/wiki/访问者模式) |
| -----------------------------------------------------------: | ------------------------------------------------------------ |
|         [并行模式](https://zh.wikipedia.org/wiki/併發型模式) | [Active object](https://zh.wikipedia.org/w/index.php?title=Active_object&action=edit&redlink=1) [Balking](https://zh.wikipedia.org/w/index.php?title=Balking&action=edit&redlink=1) [Binding properties](https://zh.wikipedia.org/w/index.php?title=Binding_properties&action=edit&redlink=1) [双重检查锁定模式](https://zh.wikipedia.org/wiki/双重检查锁定模式) [异步方法调用](https://zh.wikipedia.org/wiki/异步方法调用) [Future与promise](https://zh.wikipedia.org/wiki/Future与promise) [Guarded suspension](https://zh.wikipedia.org/w/index.php?title=Guarded_suspension&action=edit&redlink=1) [Join](https://zh.wikipedia.org/wiki/Join) [锁](https://zh.wikipedia.org/wiki/锁_(计算机科学)) [Messaging](https://zh.wikipedia.org/w/index.php?title=Messaging&action=edit&redlink=1) [监视器](https://zh.wikipedia.org/wiki/監視器_(程序同步化)) [Proactor](https://zh.wikipedia.org/w/index.php?title=Proactor&action=edit&redlink=1) [反应器](https://zh.wikipedia.org/wiki/反应器模式) [读写锁](https://zh.wikipedia.org/wiki/读写锁) [调度](https://zh.wikipedia.org/wiki/调度_(计算机)) [线程池](https://zh.wikipedia.org/wiki/线程池) [Thread-local storage](https://zh.wikipedia.org/w/index.php?title=Thread-local_storage&action=edit&redlink=1) |
|           [架构模式](https://zh.wikipedia.org/wiki/架构模式) | [ADR](https://zh.wikipedia.org/w/index.php?title=Action–Domain–Responder&action=edit&redlink=1) [Active Record](https://zh.wikipedia.org/wiki/Active_Record) [DAO](https://zh.wikipedia.org/wiki/DAO) [Data transfer object](https://zh.wikipedia.org/w/index.php?title=Data_transfer_object&action=edit&redlink=1) [Front controller](https://zh.wikipedia.org/w/index.php?title=Front_controller&action=edit&redlink=1) [Identity map](https://zh.wikipedia.org/w/index.php?title=Identity_map&action=edit&redlink=1) [Interceptor](https://zh.wikipedia.org/w/index.php?title=Interceptor&action=edit&redlink=1) [控制反转](https://zh.wikipedia.org/wiki/控制反转) [MVC](https://zh.wikipedia.org/wiki/MVC)[微服务](https://zh.wikipedia.org/wiki/微服務) [*n*-tier](https://zh.wikipedia.org/w/index.php?title=''n''-tier&action=edit&redlink=1) [Naked objects](https://zh.wikipedia.org/w/index.php?title=Naked_objects&action=edit&redlink=1) [发布/订阅](https://zh.wikipedia.org/wiki/发布/订阅) [Specification](https://zh.wikipedia.org/w/index.php?title=Specification&action=edit&redlink=1) [Service locator](https://zh.wikipedia.org/w/index.php?title=Service_locator&action=edit&redlink=1) |
|                                                     其他模式 | [Blackboard](https://zh.wikipedia.org/w/index.php?title=Blackboard_design_pattern&action=edit&redlink=1) [Business delegate](https://zh.wikipedia.org/w/index.php?title=Business_delegate&action=edit&redlink=1) [断路器](https://zh.wikipedia.org/wiki/斷路器設計模式) [Composite entity](https://zh.wikipedia.org/w/index.php?title=Composite_entity&action=edit&redlink=1) [委托](https://zh.wikipedia.org/wiki/委托模式)<br />依赖注入[Intercepting filter](https://zh.wikipedia.org/w/index.php?title=Intercepting_filter&action=edit&redlink=1) [惰性载入](https://zh.wikipedia.org/wiki/惰性載入) [Method chaining](https://zh.wikipedia.org/w/index.php?title=Method_chaining&action=edit&redlink=1) [模拟对象](https://zh.wikipedia.org/wiki/模拟对象) [空对象](https://zh.wikipedia.org/wiki/空对象模式) [对象池](https://zh.wikipedia.org/wiki/对象池模式) [Servant](https://zh.wikipedia.org/w/index.php?title=Servant&action=edit&redlink=1)[Twin](https://zh.wikipedia.org/w/index.php?title=Twin&action=edit&redlink=1) [Type tunnel](https://zh.wikipedia.org/w/index.php?title=Type_tunnel&action=edit&redlink=1) |
|                                                         书籍 | [设计模式：可复用面向对象软件的基础](https://zh.wikipedia.org/wiki/设计模式：可复用面向对象软件的基础) [企业集成模式](https://zh.wikipedia.org/w/index.php?title=企业集成模式&action=edit&redlink=1) |

### [D] 依赖反转原则

依赖倒置原则(Dependency Inversion Principle，DIP)规定:代码应当取决于抽象概念，而 不是具体实现。
 **高层模块不应该依赖于低层模块，二者都应该依赖于抽象** 

**抽象不应该依赖于细节，细节应该依赖于抽象 (总结解耦)** 

类可能依赖于其他类来执行其工作。但是，它们不应当依赖于该类的特定具体实现，而应当 是它的抽象。这个原则实在是太重要了，社会的分工化，标准化都 是这个设计原则的体现。 显然，这一概念会大大提高系统的灵活性。如果类只关心它们用于支持特定契约而不是特定 类型的组件，就可以快速而轻松地修改这些低级 服务的功能，同时最大限度地降低对系统其 余部分的影响。

|   依赖注入   | 当某个⻆色要另一个⻆色协助时，通常由调用者来创建被调用者的实例。现在创建实例由容器来完成然后注入调用者。 |
| :----------: | ------------------------------------------------------------ |
| **注入过程** | **如果需要调用另一个对象协助时，无须在代码中创建被调用者，而是依赖于外部的注入** |
| **两种方式** | **设值注入、构造注入**                                       |

```js
//Bad
// 库存查询
class InventoryRequester {
  constructor() {
    this.REQ_METHODS = ['HTTP'];
  }

  requestItem(item) {
    // ...
  }
}

// 库存跟踪
class InventoryTracker {
  constructor(items) {
    this.items = items;

    // 这里依赖一个特殊的请求类，其实我们只是需要一个请求方法。
    this.requester = new InventoryRequester();
  }

  requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

const inventoryTracker = new InventoryTracker(['apples', 'bananas']);
inventoryTracker.requestItems();


//Good:
// 库存跟踪
class InventoryTracker {
  constructor(items, requester) {
    this.items = items;
    this.requester = requester;
  }

  requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

// HTTP 请求
class InventoryRequesterHTTP {
  constructor() {
    this.REQ_METHODS = ['HTTP'];
  }

  requestItem(item) {
    // ...
  }
}

// webSocket 请求
class InventoryRequesterWS {
  constructor() {
    this.REQ_METHODS = ['WS'];
  }

  requestItem(item) {
    // ...
  }
}

// 通过依赖注入的方式将请求模块解耦，这样我们就可以很轻易的替换成 webSocket 请求。
const inventoryTracker = new InventoryTracker(['apples', 'bananas'], new InventoryRequesterHTTP());
inventoryTracker.requestItems();

```

```csharp
    interface IBankAccount
    {
        long BankNumber { get; set; } // 卡号
        decimal Balance { get; set; } // 余额
    }

    // 转账人
    interface ITransferSource : IBankAccount
    {
        void CutPayment(decimal value);
    }

    // 收款人
    interface ITransferDestination : IBankAccount
    {
        void AddMoney(decimal value);
    }

    class BankAccout : IBankAccount, ITransferSource, ITransferDestination
    {
        public long BankNumber { get; set; }
        public decimal Balance { get; set; }
        public void CutPayment(decimal value)
        {
            Balance -= value;
        }
        public void AddMoney(decimal value)
        {
            Balance += value;
        }
    }
   
    class TransferAmount
    {
        public decimal Amount { get; set; }
        public void Transfer(ITransferSource source, ITransferDestination dest)
        {
            source.CutPayment(Amount);
            dest.AddMoney(Amount);
        }
    }

   
```

## IOC(控制反转)

### 什么是控制反转？

控制反转(Inversion of Control，缩写为IoC)，是面向对象编程中的 一种设计原则，可以用来减低计算机代码之间的耦合度。其中最常⻅ 的方式叫做依赖注入(Dependency Injection，简称DI)，还有一种方 式叫“依赖查找”(Dependency Lookup)。通过控制反转，对象在被 创建的时候，由一个调控系统内所有对象的外界实体，将其所依赖的 对象的引用传递给它。也可以说，依赖被注入到对象中。

依赖查找: 容器提供回调接口 和上下文条件给组件。

依赖注入: 组件不做定位查询，只 提供普通的方法让容器 去决定依赖关系。

<img src="/automation/1596423761778_A4994C2D-853A-4F7E-A6B9-3AF770D489B1.png" alt="1596423761778_A4994C2D-853A-4F7E-A6B9-3AF770D489B1"/>

<img src="/automation/1596423771054_8F8E3324-24D8-4C44-8735-32AE519C3A4D.png" alt="1596423771054_8F8E3324-24D8-4C44-8735-32AE519C3A4D"/>

```csharp
//IoC容器，它就是一个创建工厂，你要什么对象，它就给你什么对象，有了IoC容器，依赖关系就变了，
//原先的依赖关系就没了，它们都依赖IoC容器了，通过IoC容器来建立它们之间的关系。
//通过反射来创建，把具体的文件名写在配置文件里，这时候客户端代码也不用变了，只需要改配置文件就好了，稳定性又有了提高，如下：

public class MediaFile {
    public void PlayMedia() {
        IMediaFile _mtype = Assembly.Load(ConfigurationManager.AppSettings["AssemName"]).CreateInstance(ConfigurationManager.AppSettings["MediaName"]);
        IPlayer _player = Assembly.Load(ConfigurationManager.AppSettings["AssemName"]).CreateInstance(ConfigurationManager.AppSettings["PlayerName"]);
        _player.Play(_mtype);
    }
}


```



## AOP

### 前言

面向切面(Aspect Oriented Programming)是对面向对象编程(oop)的补充

### 简介

在软件业，AOP为Aspect Oriented Programming的缩 写，意为:面向切面编程，通过预编译方式和运行期动 态代理实现程序功能的统一维护的一种技术。AOP是 OOP的延续，是软件开发中的一个热点，也是Spring框 架中的一个重要内容，是函数式编程的一种衍生范型。 利用AOP可以对业务逻辑的各个部分进行隔离，从而使 得业务逻辑各部分之间的耦合度降低，提高程序的可重 用性，同时提高了开发的效率。

### 基础概念

AOP完善spring的依赖注入(DI)面向对象编程将程序分解 成各个层次的对象，面向切面编 程将程序运行过程分解成各个切 面。

### Filter

Filter(过滤器)也是一种AOPA

它利用一种称为"横切"的技术，剖 解开封装的对象内部，并将那些 影响了多个类的公共行为封装到 一个可重用模块，并将其命名为 "Aspect"，即切面。所谓"切面"。

### 优点

AOP的好处就是你只需要干你的 正事，其它事情别人帮你干。在 你访问数据库之前，自动帮你开 启事务，当你访问数据库结束之 后，自动帮你提交/回滚事务!

