import React, {Component} from "../packages/react";
import ReactDOM from "../packages/react-dom";
import myWacher from '../utils/my-watcher';

import {
  Route,
  Link,
  history,
  Router
} from "../packages/react-router-dom";

const App = () => (
<div>
  <ul className="nav">
    <li><Link to="/">Home Link</Link></li>
    <li><Link to="/about">About Link</Link></li>
    <li><Link to="/topics">Topics, Link</Link></li>
  </ul>
  
  <BtnHome/>
  <BtnAbout/>
  <BtnTopics/>
  <hr/>
  
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/topics" component={Topics} />
</div>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = () => (
  <div>
    <h2>Topics</h2>
  </div>
);

class BtnHome extends Component {
  render() {
    return (
    <button onClick={() => history.pushState.call(this, '/')}>Home</button>
    )
  }
}

class BtnAbout extends Component {
  render() {
    return (
    <button onClick={() => history.pushState.call(this, '/about')}>About</button>
    )
  }
}

class BtnTopics extends Component {
  render() {
    return (
    <button onClick={() => history.pushState.call(this, '/topics')}>Topics</button>
    )
  }
}

function pushState(context, url) {
  history.pushState.call(context, url)
  render()
}

let render = () =>  ReactDOM.render(
  <App />,
  document.getElementById( 'root' )
);

render()

myWacher.subscribe(render)
