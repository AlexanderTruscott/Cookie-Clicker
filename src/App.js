import "./index.css";
import crunch from './Crunch.mp3';
import levelUp from './LevelUp.mp3'
import React, { useEffect, useState, useMemo } from 'react';
import confetti from "canvas-confetti";

export default function App(){
  const [experience, setExperience] = useState(() => parseInt(localStorage.getItem('experience')) || 0);
  const [level, setLevel] = useState(() => parseInt(localStorage.getItem('level')) || 1);

  let maxXP = useMemo(() => {
    return level === 1 ? 20 : Math.floor(50 * level ** 1.25);
  }, [level]);

  useEffect(function(){
    localStorage.setItem('experience', experience);
    localStorage.setItem('level', level);
    
  }, [experience, level]);
  
  const HandleCookieClick = function(){
    const newXP = experience + 1;

    const crunchSound = new Audio(crunch);
    const levelUpSound = new Audio(levelUp);
    

    if(newXP >= maxXP){
      handleLevel();
      handleFormula();
      setExperience(0);
      confetti({
        particleCount: 200,
        spread: 100
      });
      levelUpSound.play();
    } else {
      setExperience(experience + 1);
    }

    crunchSound.volume = .5
    crunchSound.playbackRate = 2;
    crunchSound.play();
  }

  const handleFormula = function(){
    maxXP = (Math.floor(50 * level**1.25));
  }

  const handleLevel = function(){
    setLevel(level + 1);
  }
  return (
    <div className="App">
      <title>Cookie Clicker</title>
      <div className="experience-Bar-Background"></div>
      <div
      className="experience-Bar-Move"
      style={{ width: `${(experience/maxXP)*50}vw` }}
      > 
      </div> 
      <h1 className="Title"> Cookie Clicker </h1>
      <h2 className="ClickTracker">
        Level: {level} || Experience: {experience}/{maxXP}
      </h2>
      <button className="CookieButton" onClick={HandleCookieClick}></button>
    </div>
  );
}