import './style.css'
import Icon from './logo.png'
import Data from './data.xml'

function component() {
  let element = document.createElement('div');
  
  element.innerHTML = 'Hello World!';
  element.classList.add('hello');
  
  let myIcon = new Image()
  myIcon.src = Icon
  
  element.appendChild(myIcon)

  console.log(Data);
  
  return element;
}

document.body.appendChild(component());
