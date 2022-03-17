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
  const [keyboardStatus, setKeyboardStatus] = useState(Array(26).fill('normal'));

  function gameOverHandler() {
    setGameOver(true);
  }

  function setUpdateKeyboardStatus(newKeyboardStatus) {
    setKeyboardStatus(newKeyboardStatus);
    localStorage.setItem('keyboardStatus', JSON.stringify(newKeyboardStatus));
  }

  function setUpdateGuess(newGuess) {
    const newGuessed = guessed.concat(newGuess);
    setGuessed(newGuessed);
    localStorage.setItem('guessed', JSON.stringify(newGuessed));
    const newGuessCount = guessCount + 1;
    setGuessCount(newGuessCount);
    localStorage.setItem('guessCount', JSON.stringify(newGuessCount));
  }

  function setUpdate(newKeyboardStatus, newGuess) {
    setUpdateKeyboardStatus(newKeyboardStatus);
    setUpdateGuess(newGuess);
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
    setLoading(false);
  }

  function getRandomWord() {
    const words = data.words;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  function getStatus(letterInGuess, index, word, isRandom) {
    var status  = "";
    if (letterInGuess === word[index]) {
      status = 'correct';
    }
    else if (word.includes(letterInGuess)) {
      status = 'partial';
    }
    else{
      status = 'wrong';
    }
    if(isRandom){
      const aRandomNumber = Math.floor(Math.random() * 2);
      // if(aRandomNumber%5 === 0){
      //   return ;
      // }
      // else{
        return status;
      // }
    }
    return 'wrong';
  }

  function checkGuess(guess) {
    const words = data.words;
    if (words.includes(guess)) {
      const currKeyboardStatus = keyboardStatus;
      for (let i = 0; i < guess.length; i++) {
        const aa = guess[i].charCodeAt(0);
        const bb = getStatus(guess[i], i, currWord, false);
        currKeyboardStatus[aa - 97] = bb;
      }

      setUpdate(currKeyboardStatus, guess);

      if (guess === currWord) {
        gameOverHandler();
        return 1;
      } else if (guessCount === 6) {
        gameOverHandler();
        return 0;
      } else {
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
    setKeyboardStatus(
      keyboardStatusCache
        ? JSON.parse(keyboardStatusCache)
        : Array(26).fill('normal')
    );
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
