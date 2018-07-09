import React, {Component} from "../packages/react";
import ReactDOM from "../packages/react-dom";

class Counter extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      num: 0
    }
  }
  
  componentWillUpdate() {
    console.log( 'update' );
  }
  
  componentWillMount() {
    console.log( 'mount' );
  }
  
  onClick() {
    this.setState( { num: this.state.num + 1 } );
  }
  
  render() {
    return (
    <div onClick={ () => this.onClick() }>
      <h1>number: {this.state.num}</h1>
      <button>add</button>
    </div>
    );
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById( 'root' )
);
