import React, {Component} from "../packages/react";
import ReactDOM from "../packages/react-dom";

class Counter extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      num: 0
    }
  }
  
  componentDidMount() {
    for ( let i = 0; i < 100; i++ ) {
      
      // 方法一
      this.setState( { num: this.state.num + 1 } );
      console.log( this.state.num );
      
      // 方法二
      // this.setState( prevState => {
      //   console.log( prevState.num );
      //   return {
      //     num: prevState.num + 1
      //   }
      // } );
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
