// import types from '../../utils/type-check'

export function Element(type, props, children) {
  this.type = type
  this.props = props
  this.children = children
}

export function createElement(type, props, ...children) {
  
  return new Element(type, props, children)
}

export default {
  createElement,
}
