import React from "react";
import Dice from "./components/Dice.js"
import './App.css';
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [dices, setDices] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(()=> {
    const firstValue = dices[0].value
    const allHeld = dices.every(dice=> dice.isHeld)
    const sameValue = dices.every(dice=>dice.value === firstValue)
    if(allHeld && sameValue){
      setTenzies(true)
    }
  }, [dices])

  function getNewDice(){
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
  }
  }

  function allNewDice (){
    const dices =[];
      for (let i=0;i<10;i++){
        dices[i] = getNewDice()
    }
      return dices;
  }

  function rollDice(){
    setDices(prevDices => prevDices.map(dice => {
      if (!dice.isHeld){
        return getNewDice()
      }
      return dice
    }))
  }

  function holdDice(id){
    const heldDice = dices.map(dice => {
      return dice.id === id ?
      {...dice,
      isHeld: !dice.isHeld} :
      dice
    })
    setDices(heldDice)
  }

  function restartGame(){
    setTenzies(false)
    setDices(allNewDice())
  }
  
  const diceElements = dices.map(dice => (
    <Dice
       key={dice.id} 
       id={dice.id}
       value={dice.value}
       isHeld={dice.isHeld}
       holdDice={() => holdDice(dice.id)}
    />
  ))

  return (
    <main>
      {tenzies && <Confetti  
                      width={800}
                      height={600}
                      confettiSource={{x: 0, y: 0, w:800, h:600}}
                      style={{ position: 'absolute', top: 0, left: 400 }}/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button 
        className="dice-btn" 
        onClick={tenzies ? restartGame : rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
  }
