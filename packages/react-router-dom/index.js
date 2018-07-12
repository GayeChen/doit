// import React, {Component} from "../react";
import React, { Component} from '../react';
import myWatcher from '../../utils/my-watcher'

let routes = [];

console.log(myWatcher, 'myWatcher');

const register = (route) => routes.push(route)
// const unRegister = (route) => routes.filter(r => route !== r)
const unRegister = (comp) => routes.splice(routes.indexOf(comp), 1);

const historyPush = (path) => {
  window.history.pushState({}, null, path)
  // routes.forEach(r => r.forceUpdate())
  myWatcher.publish()

}

window.addEventListener('popstate', () => {
  // routes.forEach(r => r.forceUpdate())
  myWatcher.publish()
})

const matchPath = (pathname, options) => {
  const {path, exact = false} = options
  const match = new RegExp(`^${path}`).exec(pathname)
  if(!match) return null
  const url = match[0]
  const isExact = pathname === url
  if(exact && !isExact) return null
  return {
    path,
    url
  }
}

export class Router extends Component {
  constructor() {
    super()
    this.state = {
      listeners: [],
      routes: routes
    }
  }
  componentDidMount() {
    // myWatcher.subscribe(() => {
    //   this.setState({

    //   })
    // })
  }
  render() {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}


export class Link extends Component {
  handleClick = (e) => {
    e.preventDefault()
    const {to} = this.props
    historyPush(to)
  }
  
  render() {
    const {to, children} = this.props
    return (
      <a href={to} onClick={this.handleClick}>
        {children}
      </a>
    )
  }
}

export class Route extends Component {
  componentWillMount() {
    register(this)
  }
  componentWillUnmount() {
    unRegister(this)
  }
  render() {
    const {path, component, exact} = this.props
    const match = matchPath(window.location.pathname, {path, exact})
    // console.log(match, 'route 是否匹配');
  
    if(!match) return null
    
    if(component) {
      return React.createElement(component)
    }
  }
}

export const history = {
  pushState: historyPush
}

export default {
  Route,
  Link,
  history
}


