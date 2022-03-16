import React, { useContext, useState, useEffect } from "react";
import data from "../data/5-words.json";
const ProbableContext = React.createContext()


export function useProbable() {
  return useContext(ProbableContext)
}




export function ProbableProvider({ children }) {

  const [guessCount, setGuessCount] = useState(1);
  const [currWord, setCurrWord] = useState("");
  const [guessed, setGuessed] = useState(["carot"]);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  function getRandomWord() {
    const words = data.words;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  function checkGuess(guess) {
    const words = data.words;
    if(words.includes(guess)) {
      console.log("yes");
      setGuessed(guessed.concat(guess));
      setGuessCount(guessCount + 1);
      if(guess === currWord){
       alert("Jeet gaye aap")
       setGameOver(true);
       return 1;
      }
      
      if(guessCount === 6){
        alert("You lose")
        setGameOver(true);
        return 1;
      }
  }
    else{
      alert("No such word")
      return 0;
    }
  }
  
  useEffect(()=>{
    const a = getRandomWord();
    setCurrWord(a);
    console.log(a);
      
    setLoading(false);
  }, []);

   

  const value = {
    guessCount,
    setGuessCount,
    currWord,
    setCurrWord,
    guessed,
    setGuessed,
    gameOver, 
    setGameOver,
    checkGuess
  }
  return (
    <ProbableContext.Provider value={value}>
      {!loading && children}
    </ProbableContext.Provider>
  )
}
