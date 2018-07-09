import types from '../../utils/type-check'
import {setAttribute, _render} from "./render";
import {isSameNodeType, removeNode, replaceNode} from "../../utils/index";
import {Component} from "../react/index";


export function diff(dom, vDom, container) {
  const newDom = diffNode(dom, vDom)
  
  if(container && newDom.parentNode !== container) {
    container.appendChild(newDom)
  }
  
  return newDom
}

function diffNode(dom, vDom) {
  let newDom = dom
  
  if(vDom === undefined || vDom === null || typeof vDom === 'boolean') vDom = ''
  
  if(typeof vDom === 'number') vDom = String(vDom)
  
  // 对比文本节点
  if(types.isString(vDom)) {
    if(dom && dom.nodeType === 3 ) {
      if(dom.textContent !== vDom) {
        dom.textContent = vDom
      }
    } else {
      newDom = document.createTextNode(vDom)
      replaceNode(newDom, dom)
  
      // if(dom && dom.parentNode) {
      //   dom.parentNode.replaceChild(newDom, dom)
      // }
    }
    return newDom
  }
  
  // 对比组件  应该放在对比非文本dom节点前面
  if(types.isFunction(vDom.type)) {
    return diffComponent(dom, vDom)
  }
  
  // 对比非文本DOM节点
  if(!dom || !isSameNodeType(dom, vDom)) {
    newDom = document.createElement(vDom.type)
    if(dom) {
      // 将原来dom的子节点一一添加到newDom新节点
      [...dom.childNodes].map(newDom.appendChild)
      replaceNode(newDom, dom)
      // dom.parentNode && dom.parentNode.replaceChild(newDom, dom)
    }
  }
  
  // 对比子节点
  if(newDom.childNodes && newDom.childNodes.length > 0 || (vDom.children && vDom.children.length > 0)) {
    diffChildren(newDom, vDom.children)
  }
  
  // 对比属性
  diffAttributes(newDom, vDom)
  
  return newDom
}

/**
 * 对比dom和虚拟dom的属性
 * @param dom
 * @param vDom
 */
function diffAttributes(dom, vDom) {
  const oldProps = {}   // 当前dom的属性
  const props = vDom.props  //虚拟dom的属性
  // [...dom.attributes].map(attr => {
  
  // Array.prototype.map.call(dom.attributes)(attr => {
  //   oldProps[attr.name] = attr.value
  // })
  
  for ( let i = 0 ; i < dom.attributes.length; i++ ) {
    const attr = dom.attributes[ i ];
    oldProps[ attr.name ] = attr.value;
  }
  
  for(let name in oldProps) {
    if(!name in props) {
      setAttribute(dom, name, undefined)
    }
  }
  
  for(let name in props) {
    if(oldProps[name] !== props[name]) {
      setAttribute(dom, name, props[name])
    }
  }
}

/**
 *
 */
function diffChildren(dom, vChildren) {
  const domChildren = dom.childNodes
  const unKeyedChildren = []         // 存放无key的child
  const keyed = {}            // 存放有key的child
  
  // 有key和无key的child分开
  if(domChildren.length) {
    // [...domChildren].forEach(domChild => {
    // [].forEach.call(domChildren)(domChild => {
    
    for(let i = 0; i < domChildren.length; i++) {
      const domChild = domChildren[i]
      const {key} = domChild
      if(key) {
        keyed[key] = domChild
      } else {
        unKeyedChildren.push(domChild)
      }
    }
  }
  
  if(vChildren && vChildren.length) {
    let min = 0;
    let unKeyLen = unKeyedChildren.length           // 无key的children的length
    let vChildrenLen = vChildren.length         // 虚拟dom的children的length
    
    for(let i = 0; i < vChildrenLen; i++) {
      const vChild = vChildren[i]
      const {key} = vChild
      let child                                 // 用来存放真实的dom，child
      
      // 如果虚拟child有key值，找到对应key值的真实节点child
      if(key) {
        if(keyed[key]) {
          child = keyed[key]
          keyed[key] = undefined
        }
        
      // 如果没有key，优先寻找类型相同的节点
      } else if(min < unKeyLen) {
        for(let j = min; j < unKeyLen; j++) {
          let unKeyedChild = unKeyedChildren[j]
          
          if(unKeyedChild && isSameNodeType(unKeyedChild, vChild)) {
            child = unKeyedChild
            unKeyedChildren[j] = undefined
            
            if(j === unKeyLen - 1) unKeyLen - 1;
            if(j === min) min++;
            break;
          }
        }
      }
      
      // 递归对比
      let newChild = diffNode(child, vChild)
      
      // 更新DOM
      const domChild = domChildren[i];
      if(newChild && newChild !== domChild && newChild !== dom) {
        // 原来的dom不存在
        if(!domChild) {
          dom.appendChild(newChild)
        // 新的节点是原来的节点的弟弟节点
        } else if(newChild === domChild.nextSibling) {
          removeNode(domChild)
        // 新的节点是原来的节点的哥哥节点
        } else {
          dom.insertBefore(newChild, domChild)
        }
      }
    }
  }
}

function diffComponent(dom, vDom) {
  let oldComponent = dom && dom._component
  // let oldDom = dom
  let newDom = dom
  // 如果组件类型没有变化，则重新setProps
  if(oldComponent && oldComponent.constructor === vDom.type) {
    setComponentProps(oldComponent, vDom.props)
  // 如果组件类型变化，则移除掉原来组件，并渲染新的组件
  } else {
    if(oldComponent) {
      unmountComponent(oldComponent)
      dom = null
    }
    
    const {type, props} = vDom
    let newComponent = createComponent(type, props)
    
    setComponentProps(newComponent, props)
  
    newDom = newComponent.dom
    
    if(dom && newDom !== dom) {
      dom._component = null
      removeNode(dom)
    }
  }
  
  return newDom
}

/**
 * 创建组件
 * @param component
 * @param props
 * @returns {*}
 */
export function createComponent(component, props) {
  let instance = null
  // 类定义组件
  if(component.prototype && component.prototype.render) {
    instance = new component(props)
    // 如果是函数定义组件
  } else {
    instance = new Component(props)
    instance.constructor = component
    instance.render = function () {
      return this.constructor(props)
    }
    // instance = component(props)
    // instance.render = function () {
    //   component(props)
    // }
  }
  return instance
}

export function setComponentProps(component, props) {
  // 如果组件是第一次渲染
  if(!component.dom) {
    component.componentWillMount && component.componentWillMount()
  } else if( component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props)
  }
  component.props = props
  renderComponent(component)
}

export function renderComponent(component) {
  const element = component.render();
  
  if(component.dom && component.componentWillUpdate) {
    component.componentWillUpdate();
  }
  
  // let dom = _render(element)
  let dom = diffNode(component.dom, element)
  
  if(component.dom) {
    component.componentDidUpdate && component.componentDidUpdate()
  } else if(component.componentDidMount) {
    component.componentDidMount();
  }
  
  // if(component.dom && component.dom.parentNode) {
  //   component.dom.parentNode.replaceChild(dom, component.dom)
  // }
  
  component.dom = dom
  dom._component = component
}

export function unmountComponent(component) {
  if(component.componentWillUnmount) {
    component.componentWillUnmount()
  }
  removeNode(component.dom)
}

