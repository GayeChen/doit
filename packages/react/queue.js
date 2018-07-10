import {renderComponent} from "../react-dom/diff";

const setStateQueue = []
const renderQueue = []

export function enqueueSetState(stateChange, component) {
  if(setStateQueue.length === 0) {
    defer(flush)
  }
  setStateQueue.push({
    stateChange,
    component
  })
  
  if(!renderQueue.some(item => item === component)) {
    renderQueue.push(component)
  }
}

function flush() {
  let item, component;
  // 遍历
  while( item = setStateQueue.shift() ){
    const {stateChange, component} = item
    
    if(!component.prevState) {
      component.prevState = Object.assign({}, component.state)
    }
    
    if(typeof stateChange === 'function') {
      Object.assign(component.state, stateChange(component.prevState, component.props))
    } else {
      Object.assign(component.state, stateChange)
    }
    
    component.prevState = component.state
  }
  
  // 渲染每一个组件
  while(component = renderQueue.shift()) {
    renderComponent(component)
  }
}

function defer(fn) {
  return Promise.resolve().then(fn)
  
  // return requestAnimationFrame(fn)
  
  // return setTimeout(fn, 0)
  
  // return setTimeout(fn, 16)    // 一秒60次，即60帧，人眼每秒只能捕获60幅画面
}
