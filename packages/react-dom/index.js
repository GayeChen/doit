import types from '../../utils/type-check'
import {Component} from "../react";

// import {Element} from '../react'

function setProps(ele, props) {
  if(types.isObject(props)) {
    Object.getOwnPropertyNames(props).map(key => {
      let val = props[key]
      if(key === 'className') {
        ele.classList.add(val)
      } else if(key === 'style') {
        for(let item in val) {
          ele.style[item] = val[item]
        }
      } else if(/on\w+/.test(key)) {
        key = key.toLowerCase()
        ele[key] = val || ''
      } else {
        ele.setAttribute(key, val)
      }
    })
  }
}

function setChildren(parentEle, children) {
  if(types.isString(children)) {
    _render(children, parentEle)
  } else {
    children.forEach(child => _render(child, parentEle))
  }
}

function createComponent(component, props) {
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
    // instance.render = function () {
    //   component(props)
    // }
  }
  return instance
}

function setComponentProps(component, props) {
  // 如果组件是第一次渲染
  if(!component.dom) {
    component.componentWillMount && component.componentWillMount()
  } else if( component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props)
  }
  component.props = props
  renderComponent(component)
}

function _render(vDom, container) {
  let dom = null
  if(types.isNumber(vDom)) {
    vDom = vDom + '';
  }
  if(types.isString(vDom)) {
    dom = document.createTextNode(vDom)
  } else if(types.isFunction(vDom.type)) {
    const {type, props} = vDom
    const component = createComponent(type, props)
    setComponentProps(component, props)
    dom = component.dom
    
  } else {
    const {type, props, children} = vDom
    dom = document.createElement(type)
    if(props) setProps(dom, props)
    if(children) setChildren(dom, children)
  }
  if(container) {
    return container.appendChild(dom)
  }
  return dom
}


export function render(vDom, container) {
  container.innerHTML = ''
  return _render(vDom, container)
}

export function renderComponent(component) {
  const element = component.render();
  
  if(component.dom && component.componentWillUpdate) {
    component.componentWillUpdate();
  }
  
  let dom = _render(element)
  if(component.dom) {
    component.componentDidUpdate && component.componentDidUpdate()
  } else if(component.componentDidMount) {
    component.componentDidMount();
  }
  
  if(component.dom && component.dom.parentNode) {
    component.dom.parentNode.replaceChild(dom, component.dom)
  }
  
  component.dom = dom
  dom._component = component
}

export default {
  render,
}
