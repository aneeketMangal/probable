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
  
  function gameOverHandler(){
    setGameOver(true);    
  }

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
      const temp  = keyboardStatus;
      for (let i = 0; i < guess.length; i++) {
        const aa = guess[i].charCodeAt(0);
        const bb = getStatus(guess[i], i, currWord);
        temp[aa-97] = bb;
      }
      setKeyboardStatus(temp);
      setGuessed(guessed.concat(guess));
      setGuessCount(guessCount + 1);

      // saving local storage cache
      localStorage.setItem('keyboardStatusCache', JSON.stringify(temp));
      localStorage.setItem("guessedCache", JSON.stringify(guessed.concat(guess)));
      localStorage.setItem("guessCountCache", JSON.stringify(guessCount+1));
      if(guess === currWord){
       gameOverHandler();
       return 1;
      }
      
      else if(guessCount === 6){
        gameOverHandler();
        return 0;
      }
      else{
        return -2
      }
  }
    else{
      return -1;
    }
  }

  useEffect(() => {    
    const guessedCache = localStorage.getItem("guessedCache");
    console.log(guessedCache);
    setGuessed(guessedCache ? JSON.parse(guessedCache) : []);
    const guessCountCache = localStorage.getItem("guessCountCache");
    setGuessCount(guessCountCache ? JSON.parse(guessCountCache) : 0);
    const keyboardStatusCache = localStorage.getItem("keyboardStatusCache");
    setKeyboardStatus(keyboardStatusCache ? JSON.parse(keyboardStatusCache) : Array(26).fill("normal"));
    const currWordCache = localStorage.getItem("currWordCache");
    if(currWordCache){
      setCurrWord(currWordCache);
    }
    else{
      const curr = getRandomWord();
      localStorage.setItem("currWordCache", curr);
      setCurrWord(curr);
    }
    setLoading(false);
  } , []);

   

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
