import React, { useContext, useState, useEffect } from "react";
import data from "../data/5-words.json";
const ProbableContext = React.createContext()


export function useProbable() {
  return useContext(ProbableContext)
}

function getRandomWord() {
  const words = data.words;
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}


export function ProbableProvider({ children }) {

  const [guessCount, setGuessCount] = useState(1);
  const [currWord, setCurrWord] = useState("");
  const [guessed, setGuessed] = useState(["carot"]);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);

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
  }
  return (
    <ProbableContext.Provider value={value}>
      {!loading && children}
    </ProbableContext.Provider>
  )
}
