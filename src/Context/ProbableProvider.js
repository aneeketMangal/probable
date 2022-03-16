import React, { useContext, useState, useEffect } from "react";
import data from "../data/5-words.json";
const ProbableContext = React.createContext()


export function useProbable() {
  return useContext(ProbableContext)
}




export function ProbableProvider({ children }) {

  const [guessCount, setGuessCount] = useState(0);
  const [currWord, setCurrWord] = useState("");
  const [guessed, setGuessed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(Array(26).fill("normal"));
  

  function getRandomWord() {
    const words = data.words;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  function getStatus(letterInGuess, index, word) {
    if(letterInGuess === word[index]) {
        return 'correct';
    }
    if(word.includes(letterInGuess)){
        return 'partial';
    }
    return 'wrong';
}

  function checkGuess(guess) {
    const words = data.words;
    if(words.includes(guess)) {
      for (let i = 0; i < guess.length; i++) {
        const aa = guess[i].charCodeAt(0);
        const bb = getStatus(guess[i], i, currWord);
        const temp = keyboardStatus
        temp[aa-97] = bb;
        setKeyboardStatus(temp);
        console.log(keyboardStatus);
      }
      
      // setKeyboardStatus({...keyboardStatus, ...d});
      // console.log(keyboardStatus)
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
    checkGuess,
    getStatus,
    keyboardStatus,
    setKeyboardStatus
  }
  return (
    <ProbableContext.Provider value={value}>
      {!loading && children}
    </ProbableContext.Provider>
  )
}
