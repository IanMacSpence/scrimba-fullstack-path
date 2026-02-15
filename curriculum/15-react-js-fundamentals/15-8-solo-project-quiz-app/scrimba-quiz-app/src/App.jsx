import { useState, useEffect } from 'react'
import './App.css'
import { data } from "./data.js"
//html entity package

import QuestionCard from './components/QuestionCard.jsx'

export default function App() {
  /* State variables */
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [qaList, setQAList] = useState(data.results) //need to fetch from API to set this
  const [userIsFinished, setUserIsFinished] = useState(false)

  console.log(qaList)

  /* Derived variables */


  /* Static variables */

  /* Functions */
  // async function getDataFromApi(){
  //   const response = await fetch("https://opentdb.com/api.php?amount=5")
  //   const qaObjects = await response.json().results
  //   return qaObjects
  // }

const qaCards = qaList.map(qaObject => {
        return (
          <QuestionCard
            key={qaObject.question}
            question={qaObject.question} 
            correctAnswer={qaObject.correct_answer} 
            incorrectAnswers={qaObject.incorrect_answers}
          />
        )
      })
  
  return (
    <main>
      {!isGameStarted ? 
        <>
          <h1>Quizzical</h1>
          <p>Some description if needed</p>
          <button 
            onClick={() => setIsGameStarted(true)}
            className='start-quiz-btn'
          >
            Start quiz
          </button>
        </>
        :
        <>
          {qaCards}
          <button className='check-answer-btn'>Check answers</button>
        </>
      }
      
    </main>
  )
}

