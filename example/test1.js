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

import React, {Component} from '../packages/react'
import {render} from '../packages/react-dom'


function Hello({name}) {
 return <div>
   Hello, I am {name}, a stateless function component
 </div>
}

class Hello2 extends Component{
  constructor(props) {
    super(props)
  }
  render() {
    const {name} = this.props
    return <div>
      Hello, I am {name}, a component
    </div>
  }
}

const Ele = React.createElement(
'h1',
  {
    style: {color: 'red'},
    className: 'hello',
  },
  'Hello, world! \n',
  'I am a react element',
   <Hello name={'hello'}/>,
  <Hello2 name={'hello2'}/>
)

console.log(Ele);

render(Ele, document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./test1.js', function() {
    console.log('Accepting the updated printMe module!');
    render(Ele, document.getElementById('root'))
  })
}
