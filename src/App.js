import { useState } from 'react';
import './App.css';

let sequence = [];
let humanSequence = [];

function App() {

  const [level, setLevel] = useState(0);
  const [content, setContent] = useState('');

  const randomNumber = () => {
    return String(Math.trunc((Math.random() * 4) + 1));
  }

  function resetGame(text) {
    alert(text);
    sequence = [];
    humanSequence = [];
    setLevel(0);
    document.querySelector('.start-button').classList.remove('display_none');
    document.querySelector('.info').classList.add('display_none');
    document.querySelector('.container').classList.add('unclickable');
  }

  function handleClick(e) {
    const tile = e.target.getAttribute('id');
    const index = humanSequence.push(tile) - 1;

    const remainingTaps = sequence.length - humanSequence.length;

    if (humanSequence[index] !== sequence[index]) {
      resetGame('Oops! Game over, you pressed the wrong tile');
      return;
    }

    if (humanSequence.length === sequence.length) {
      if (humanSequence.length === 20) {
        resetGame('Congrats! You completed all the levels');
        return
      }

      humanSequence = [];
      setContent('Success! Keep going!');
      setTimeout(() => {
        nextRound();
      }, 1000);
      return;
    }

    setContent(`Your turn: ${remainingTaps} Tap${remainingTaps > 1 ? 's' : ''
      }`);
  }

  const levelUp = () => {
    setLevel(level + 1);
  }

  const humanTurn = () => {
    document.querySelector('.container').classList.remove('unclickable');
  }

  const activateTile = (color) => {
    console.log(sequence);
    const title = document.getElementById(`${color}`);

    title.classList.add('animation');
    setTimeout(() => {
      title.classList.remove('animation');
    }, 300);
  }

  const playRound = () => {
    sequence.push(randomNumber());
    sequence.forEach((color, index) => {
      setTimeout(() => {
        activateTile(color);
      }, (index + 1) * 600);
    });
  }

  const nextRound = () => {
    levelUp();
    document.querySelector('.container').classList.add('unclickable');

    playRound();
    setTimeout(() => {
      humanTurn();
    }, level * 600 + 1000);
  }


  const startGame = () => {
    document.querySelector('.start-button').classList.add('display_none');
    document.querySelector('.info').classList.remove('display_none');
    setContent('Wait for the computer');
    nextRound();
  }

  return (
    <div className='main'>
      <div className="text">{level === 0 ? 'Simon Game' : `LEVEL ${level} of 20`}</div>
      <section className="container">
        <div className="box red" id="1" onClick={handleClick}></div>
        <div className="box blue" id="2" onClick={handleClick}></div>
        <div className="box green" id="3" onClick={handleClick}></div>
        <div className="box yellow" id="4" onClick={handleClick}></div>
      </section>
      <footer className="info-section">
        <button className="start-button js-start" onClick={startGame}>Start</button>
        <span className="info js-info display_none">{content}</span>
      </footer>
    </div>
  );
}

export default App;
