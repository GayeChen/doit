import {renderComponent} from "../react-dom/diff";
import {enqueueSetState} from "./queue";

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
  
  setState(stateChange) {
    // Object.assign(this.state, stateChange)
    // renderComponent(this)
    enqueueSetState(stateChange, this)
  }
}

export function createElement(type, props, ...children) {
  
  return new Element(type, props, children)
}

export default {
  Component,
  createElement,
}
