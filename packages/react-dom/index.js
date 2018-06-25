import types from '../../utils/type-check'
import {Element} from '../react'

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

function _render(vDom, container) {
  let element = null
  if(types.isString(vDom)) {
    element = document.createTextNode(vDom)
  } else if(types.isFunction(vDom)) {
    vDom = vDom()
    _render(vDom, container)
  } else {
    const {type, props, children} = vDom
    element = document.createElement(type)
    setProps(element, props)
    if(children) setChildren(element, children)
  }
  
  return container.appendChild(element)
}

export function render(vDom, container) {
  container.innerHTML = ''
  return _render(vDom, container)
}

export default {
  render,
}
