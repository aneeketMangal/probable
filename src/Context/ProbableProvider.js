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
  const [keyboardStatus, setKeyboardStatus] = useState(
  {
    "A": 'normal',
    "B": 'normal',
    "C": 'normal',
    "D": 'normal',
    "E": 'normal',
    "F": 'normal',
    "G": 'normal',
    "H": 'normal',
    "I": 'normal',
    "J": 'normal',
    "K": 'normal',
    "L": 'normal',
    "M": 'normal',
    "N": 'normal',
    "O": 'normal',
    "P": 'normal',
    "Q": 'normal',
    "R": 'normal',
    "S": 'normal',
    "T": 'normal',
    "U": 'normal',
    "V": 'normal',
    "W": 'normal',
    "X": 'normal',
    "Y": 'normal',
    "Z": 'normal',
  }
  )

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
      const d = {}
      for (let i = 0; i < guess.length; i++) {
        d[guess[i]] = getStatus(guess[i], i, currWord);
        console.log(d)
      }
      setKeyboardStatus({...keyboardStatus, ...d});
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
  }
  return (
    <ProbableContext.Provider value={value}>
      {!loading && children}
    </ProbableContext.Provider>
  )
}
