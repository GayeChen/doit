import './style.css'
import Icon from './logo.png'
// import Data from './data.xml'
//
// function component() {
//   let element = document.createElement('div');
//
//   element.innerHTML = 'Hello World!';
//   element.classList.add('hello');
//
//   let myIcon = new Image()
//   myIcon.src = Icon
//
//   element.appendChild(myIcon);
//
//   console.log(Data);
//
//   return element;
// }
//
// document.body.appendChild(component());

import React from '../packages/react'
import {render} from '../packages/react-dom'


function Test2() {
 return <div>
   Hello, I am a stateless function component
 </div>
}

const Ele = React.createElement(
'h1',
  {
    style: {color: 'red'},
    className: 'hello',
  },
  'Hello, world! \n',
  'I am a react element',
)

console.log(Ele);

render(Ele, document.getElementById('root'))
