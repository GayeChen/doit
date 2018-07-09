import './style.css'
// import Icon from './logo.png'
// import Data from './data.xml'

/* function component() {
  let element = document.createElement('div');

  element.innerHTML = 'Hello World!';
  element.classList.add('hello');

  let myIcon = new Image()
  myIcon.src = Icon

  element.appendChild(myIcon);

  console.log(Data);

  return element;
} */

// document.body.appendChild(component());

import React, {Component} from '../packages/react'
import ReactDOM from '../packages/react-dom'

function render(element) {
  ReactDOM.render(
    element,
  document.getElementById( 'root' )
  );
}

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  render(element)
}

setInterval( tick, 1000 );

// if (module.hot) {
//   module.hot.accept('./test1.js', function() {
//     console.log('Accepting the updated printMe module!');
//     render(Ele, document.getElementById('root'))
//   })
// }
