"use-client";
import ArticleIcon from '@mui/icons-material/Article';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { ArlinearQuizWithResult } from "@arlinear/quiz-react";
import "@arlinear/quiz-react/dist/public/style.css";
 
export default function QuizPage({ quizId = null }) {

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState('preview'); // preview, attempts, raw quiz data


  useEffect(() => {

    const fetchQuiz = async () => {
  
      setLoading(true);
  
      fetch("https://api.arlinear.com/functions/v1/get-quiz", {
        method: "POST",
        headers: {
          Authorization: "b4ae786a-62f5-4924-8d00-7aeae8683e4c",
        },
        body: JSON.stringify({
          quizId: quizId,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
  
          setQuiz(data);
  
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    };

    if (quizId) {
      fetchQuiz();
    }

  }, [quizId]);

  return (
    <div className="flex flex-col gap-3 py-24">

        <div className="flex justify-center items-center gap-3">
        <ArticleIcon />
        <h1 className='text-lg'>{ quiz ? quiz.title : "Loading..."}</h1>
        </div>
        
        <hr className='mb-3'></hr>

        <div className="flex justify-center items-center gap-3">
        {["preview","json data"].map((tabName, index) => (
            <Button key={index} variant={tab == tabName ? "contained" : "outlined"} onClick={() => setTab(tabName)}>
                {tabName}
            </Button>
        ))}
        </div>

        {quiz && tab == 'preview' &&
        (
            <ArlinearQuizWithResult 
                key={quizId}
                quizKey={quizId}
                onSubmit={() => {}}
                onTryAgain={ () => {} } 
            />
        )
        }

        {quiz && tab == 'json data' &&
        (<p>
            title: {quiz.title}, <br />
            quizId: {quiz.quizId}, <br />
            questions: {JSON.stringify(quiz.questions)}, <br />
        </p>)
        }

    </div>
  )
}