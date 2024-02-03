import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getTrivia } from './lib/api/trivia';
import { translateJp } from './lib/api/translation';

function decodeHtmlEntities(html: string): string {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = html;
  return textArea.textContent || '';
}

function App() {
  const [triviaQuestion, setTriviaQuestion] = useState<string>();
  const [triviaAnswer, setTriviaAnswer] = useState<string>();
  const [isAnsShow, setAnsShow] = useState(false);
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [triviaAnswerList, setTriviaAnswerList] = useState<string[]>();


  const getJpTrivia = async () => {
      setAnsShow(false)
      setShow(true);
      setLoading(true);
      const trivia = await getTrivia()
      const encodedQuestion = trivia.results[0].question
      const encodedAnswer = trivia.results[0].correct_answer
      const encodedInCorrectAnswers = trivia.results[0].incorrect_answers
      console.log(111111);
      console.log(trivia.results[0]);
      
      const translatedTriviaQuestion = await translateJp(decodeHtmlEntities(encodedQuestion))
      const translatedTriviaAnswer = await translateJp(decodeHtmlEntities(encodedAnswer))
      const answers = encodedInCorrectAnswers.map(async (incorrect_answer: string) => {
        await translateJp(decodeHtmlEntities(incorrect_answer))
      })
      setTriviaAnswerList(answers)
      setLoading(false);
      

      setTriviaQuestion(translatedTriviaQuestion.translations[0].text)
      setTriviaAnswer(translatedTriviaAnswer.translations[0].text)
  }
  return (
    <div className="App">
      <header className="App-header">
        <button style={{marginBottom: '16px'}} onClick={getJpTrivia}>クイズを見る</button>
        {isLoading && <p>質問取得中...</p>}
        {triviaQuestion && <p>{triviaQuestion}</p>}
        {isShow ? <button onClick={()=>(setAnsShow(true))}>解答を見る</button> : <p></p>}
        {isAnsShow ? <p>{triviaAnswer && <span>{triviaAnswer}</span>}</p> : <p></p>}
        {/* {triviaAnswerList && triviaAnswerList.map((h) => (<span>{h}</span>))} */}
      </header>
    </div>
  );
}

export default App;
