import React, { useContext, useState, useEffect } from 'react';
import data from '../data/5-words.json';
const ProbableContext = React.createContext();

export function useProbable() {
  return useContext(ProbableContext);
}

export function ProbableProvider({ children }) {
  const [guessCount, setGuessCount] = useState(0);
  const [currWord, setCurrWord] = useState('');
  const [guessed, setGuessed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [lastTrueGuess, setLastTrueGuess] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(Array(26).fill('normal'));

  function gameOverHandler() {
    setGameOver(true);
  }

  function recalculateKeyboardStatus(currGuessed) {
    var newKeyboardStatus = Array(26).fill('normal');
    currGuessed.forEach(val => {
      for (let i = 0; i < val.length; i++) {
        const aa = val[i].charCodeAt(0);
        const bb = getStatus(val[i], i);
        newKeyboardStatus[aa - 97] = bb;
      }
    })
    return newKeyboardStatus;
  }

  function setUpdateKeyboardStatus(newKeyboardStatus) {
    setKeyboardStatus(newKeyboardStatus);
    localStorage.setItem('keyboardStatus', JSON.stringify(newKeyboardStatus));
  }

  function setUpdateGuess(newGuessed) {
    setGuessed(newGuessed);
    localStorage.setItem('guessed', JSON.stringify(newGuessed));
    const newGuessCount = guessCount + 1;
    setGuessCount(newGuessCount);
    localStorage.setItem('guessCount', JSON.stringify(newGuessCount));
  }

  function setUpdate(newGuessed) {
    const newKeyboardStatus = recalculateKeyboardStatus(newGuessed);
    setUpdateKeyboardStatus(newKeyboardStatus);
    setUpdateGuess(newGuessed);
  }

  function startNewGame(){
    setLoading(true);
    setGuessCount(0);
    setGuessed([]);
    const newCurrWord = getRandomWord()
    setCurrWord(newCurrWord);
    setGameOver(false);
    setKeyboardStatus(Array(26).fill('normal'));
    localStorage.setItem('currWord', newCurrWord)
    localStorage.setItem('guessCount', JSON.stringify(0));
    localStorage.setItem('guessed', JSON.stringify([]));
    localStorage.setItem('keyboardStatus', JSON.stringify(Array(26).fill('normal')));
    localStorage.setItem('lastTrueGuess', '');
    setLoading(false);
  }

  function getRandomWord() {
    const words = data.words;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  function getStatus(letterInGuess, index) {
    var status  = "";
    if (letterInGuess === currWord[index]) {
      status = 'correct';
    }
    else if (currWord.includes(letterInGuess)) {
      status = 'partial';
    }
    else{
      status = 'wrong';
    }
    return status;
  }



  function checkGuess(guess) {
    const words = data.words;
    if (words.includes(guess)) {
      var newGuessed = guessed;
      // first set the last unset word
      if(newGuessed.length >0){
        newGuessed.pop();
        newGuessed.push(lastTrueGuess);
      }
      setLastTrueGuess(guess);
      localStorage.setItem('lastTrueGuess', guess);
      
      
      // creating a false guess with probability 1/5
      
      
      
      if (guess === currWord) {
        newGuessed.push(guess);
        setUpdate(newGuessed);
        gameOverHandler();
        return 1;
      } 
     
      if (guessCount === 5) {
       
        newGuessed.push(guess);
        setUpdate(newGuessed);
        gameOverHandler();
        return 0;
      } else {
        var falseGuess = guess;
        const randomNumber = Math.floor((Math.random() * 1000000) + 1);
        if(randomNumber%2 === 0){
          falseGuess = getRandomWord();
        }    
        newGuessed.push(falseGuess);
        setUpdate(newGuessed);  
        return -2;
      }
    } else {
      return -1;
    }
  }

  useEffect(() => {
    const guessedCache = localStorage.getItem('guessed');
    setGuessed(guessedCache ? JSON.parse(guessedCache) : []);
    const guessCountCache = localStorage.getItem('guessCount');
    setGuessCount(guessCountCache ? JSON.parse(guessCountCache) : 0);
    const keyboardStatusCache = localStorage.getItem('keyboardStatus');
    const lastTrueGuessCache = localStorage.getItem('lastTrueGuess');
    setLastTrueGuess(lastTrueGuessCache ? lastTrueGuessCache : '');
    setKeyboardStatus(
      keyboardStatusCache
        ? JSON.parse(keyboardStatusCache)
        
        : Array(26).fill('normal')
    );
    // const lastTrueGuessCache = localStorage.getItem('lastTrueGuess');
    // setLastTrueGuess(lastTrueGuessCache ? lastTrueGuessCache : '');
    const currWordCache = localStorage.getItem('currWord');
    if (currWordCache) {
      setCurrWord(currWordCache);
    } else {
      const curr = getRandomWord();
      localStorage.setItem('currWord', curr);
      setCurrWord(curr);
    }
    
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
    setKeyboardStatus,
    startNewGame,
  };
  return (
    <ProbableContext.Provider value={value}>
      {!loading && children}
    </ProbableContext.Provider>
  );
}
