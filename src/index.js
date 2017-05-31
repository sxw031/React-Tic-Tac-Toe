import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Here, Square,Board, Game is a React component class, or React component type. 
// A component takes in parameters, called props, and returns a hierarchy of views to display via the render method.

// The render method returns a description of what you want to render, and then React takes description.
// and renders it to the screen. In particular, render returns a React element, which is a lightweight description of what to render.
// Most React developers use a special syntax called JSX which makes it easier to write these structures.

// React components can have state by setting this.state in the constructor, which should be considered private to the component.

class Square extends React.Component {

	// add a constructor to the class to initialize the state.
	// in javaScript classes, you need to explicitly call super(); when defining the constructor of a subclass.
	constructor() {
		super();
		this.state = {
			value: null,
		};
	}

  	render() {
    	return (
    		// add a interactive component, using the new JavaScript arrow function syntax by passing a function as the onClick prop.
    		// whenever this.setState is called, an update to component is scheduled, causing React to merge in the passed state update and
    		// render the component along with this descendants. 
    		// When the component rerenders, this.state.value will be 'X' so you'll see an X in the grid.
    		<button className="square" onClick={()=> this.setState({value: 'X'})}>
        		{this.state.value}

      		</button>
    	);
  	}
}

class Board extends React.Component {
  renderSquare(i) {
  	//pass a value prop to the Square
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
