import types from '../../utils/type-check'
import {setComponentProps, createComponent, diff} from "./diff";

// import {Element} from '../react'

export function setAttribute(ele, key, val) {
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
}

/**
 * 给元素设置属性
 * @param ele
 * @param props
 */
function setProps(ele, props) {
  if(types.isObject(props)) {
    Object.getOwnPropertyNames(props).map(key => {
      let val = props[key]
      setAttribute(ele, key, val)
    })
  }
}

/**
 * 给元素设置子节点
 * @param parentEle
 * @param children
 */

function setChildren(parentEle, children) {
  if(types.isString(children)) {
    _render(children, parentEle)
  } else {
    children.forEach(child => _render(child, parentEle))
  }
}

export function _render(vDom, container) {
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


export function render(vDom, container, dom) {
  container.innerHTML = ''
  // return _render(vDom, container)
  return diff(dom, vDom, container)
}
