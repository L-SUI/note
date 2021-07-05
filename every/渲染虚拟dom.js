// 写一个函数实现把虚拟dom转化为真实dom，（虚拟dom：{tag:'', props:{}, children:[]}）

export class NativeElement {
    static createElement(props) {
      return new NativeElement(props)
    }
    constructor(options) {
      this.tagName = options.tagName
      this.props = options.props
      this.children = options.children
    }
    render() {
      const ele = document.createElement(this.tagName)
      const props = this.props;
      const children = this.children || [];
      for (let propName in props){
        const propsValue = props[propName];
        ele.setAttribute(propName, propsValue);
      }
      children.forEach(( child) => {
        const childEl = child instanceof NativeElement ? child.render():document.createTextNode(child)
        ele.appendChild(childEl);
      })
      return ele;
    }
  }
  const child1 = NativeElement.createElement({ tagName: 'button', props: {class: 'cancel'}, children: ['取消'] })
  
  const div = NativeElement.createElement({ tagName: 'div', props: {class: 'test'}, children: [child1, '测试文本'] }).render()
  
  /*
  document.body.appendChild(div)
  <div class="test">
    <button class="cancel">取消</button>
    测试文本
  </div>
  */