import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap.min.css';
const corona = require("./corona.gif");
const human = require("./human.gif");
const t1 = require("./pop1.mp3");
const t2 = require("./pop2.mp3");
const music = require("./music.mp3");


var bleep = new Audio();
bleep.src = music;

var tone1 = new Audio();
tone1.src = t1;

var tone2 = new Audio();
tone2.src = t2;

// render a single button
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>

            <img src={props.value} alt="" width={200} />
        </button>
    );
}

// render 9 squares
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            input1: '',
            input2: '',
            submit1: '',
            submit2: '',
            style: ""

        };
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange1(event) {
        this.setState({
            input1: event.target.value
        });
    }
    handleChange2(event) {
        this.setState({
            input2: event.target.value
        });
    }
    handleSubmit(event) {
        var x = document.getElementById("gameBoard");
        x.style.display = "block";


        event.preventDefault()
        this.setState({
            submit1: this.state.input1,
            submit2: this.state.input2,
            style: this.state.x

        });
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // squares[i] = this.state.xIsNext ? 'X' : 'O';
        if (this.state.xIsNext) {
            squares[i] = corona
            // squares[i] = "X"
            tone1.play();
        }
        else {
            squares[i] = human
            // squares[i] = "O"
            tone2.play()
        }
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            if (winner === corona) {
                status = <h2>Winner  : {this.state.submit1}</h2>
                bleep.play();
            }
            else {
                status = <h2>Winner  : {this.state.submit2}</h2>
                bleep.play();

            }
        } else {
            status = <h4>Next player:  {(this.state.xIsNext ? this.state.submit1 : this.state.submit2)}</h4>

        }

        function refreshPage() {
            window.location.reload(false);
        }

        return (
            <div className="container">
                <div className="text-center">
                    <img className="w-50 mt-3" alt="" src="https://cdn.clipart.email/0fc370ce506fb192d74fdcd74c4eae94_stone-clip-tic-tac-transparent-png-clipart-free-download-ywd_1198-366.gif"></img>
                </div>
                <div className="row">
                    <div className="col-3 mt-3">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <span>Player 1</span>
                                <input
                                    id="inputtext"
                                    className="form-control"
                                    value={this.state.input}
                                    onChange={this.handleChange1} required />
                            </div>
                            <div className="form-group">
                                <span>Player 2</span>
                                <input
                                    id="inputtext"
                                    className="form-control"
                                    value={this.state.input}
                                    onChange={this.handleChange2} required />
                            </div>
                            <button id="submit" className="btn btn-success mb-3" type='submit' >Submit!</button>
                        </form>
                        <button onClick={refreshPage} className="btn btn-success mb-3" >Restart!</button>
                        <h5>Player 1 : {this.state.submit1}</h5>
                        <h5>Player 2 : {this.state.submit2}</h5>
                        <div className="status">{status}</div>

                    </div>

                    <div className="col-9 mt-3" >
                        <div id="gameBoard">
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
                    </div>
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="">
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

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
