// import {renderComponent} from "../react-dom/diff";
// import {setComponentProps} from "../react-dom/diff";
import {enqueueSetState} from "./queue";


export function Element(type, props, children) {
  this.type = type
  this.props = {...props, children}
  this.children = children
}

export class Component {
  constructor(props = {}) {
    // console.log(props, 'constoructio');
    this.state = {}
    this.props = props
  }
  
  forceUpdate = () => {
    this.setState({})
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
