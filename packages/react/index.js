// import types from '../../utils/type-check'
import {renderComponent} from "../react-dom";

export function Element(type, props, children) {
  this.type = type
  this.props = props
  this.children = children
}

export class Component {
  constructor(props = {}) {
    this.state = {}
    this.props = props
  }
  
  setState(newState) {
    Object.assign(this.state, newState)
    renderComponent(this)
  }
}

export function createElement(type, props, ...children) {
  
  return new Element(type, props, children)
}

export default {
  createElement,
}
