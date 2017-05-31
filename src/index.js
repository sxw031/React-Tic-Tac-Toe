import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Here, Square,Board, Game is a React component class, or React component type. 
// A component takes in parameters, called props, and returns a hierarchy of views to display via the render method.

// The render method returns a description of what you want to render, and then React takes description.
// and renders it to the screen. In particular, render returns a React element, which is a lightweight description of what to render.
// Most React developers use a special syntax called JSX which makes it easier to write these structures.

// React components can have state by setting this.state in the constructor, which should be considered private to the component.

//a common convention in React apps to use on* names for the handler prop names and handle* for their implementations.

class Square extends React.Component {

	// add a constructor to the class to initialize the state.
	// in javaScript classes, you need to explicitly call super(); when defining the constructor of a subclass.
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		value: null,
	// 	};
	// }

  	render() {
    	return (
    		// add a interactive component, using the new JavaScript arrow function syntax by passing a function as the onClick prop.
    		// whenever this.setState is called, an update to component is scheduled, causing React to merge in the passed state update and
    		// render the component along with this descendants. 
    		// When the component rerenders, this.state.value will be 'X' so you'll see an X in the grid.
    		<button className="square" onClick={() => this.props.onClick()}>
        		{this.props.value}
      	</button>
    	);
  	}
}

class Board extends React.Component {
  // the best solution here is to store this state in the Board component instead of in each Square
  // and the Board component can tell each Square what to display, like how we made each square display its index earlier.

  // add a constructor to the Board and set its initial state to contain an array with 9 nulls, corresponding to the 9 squares.
  // constructor() {
  //   super();
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     //default the first move to be by "X"
  //     xIsNext: true,
  //   };
  // }

  renderSquare(i) {
  	//pass a value prop to the Square, and change what happens when a square is clicked.
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)} 
      />
    );
  }

  render() {
    //display who is the next
    //const status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
    // }

    return (
      <div>
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

  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // show the moves
    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  //define handleClick function
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length -1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 ? false : true
    });
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
