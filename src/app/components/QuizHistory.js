"use client";
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';

export default function QuizHistory() {

    const [history, setHistory] = useState([]);

    // update history when localStorage history changes
    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            const storedHistory = JSON.parse(localStorage.getItem("quizHistory")) ?? [];
            setHistory(storedHistory);
        }

        // Poll for changes in localStorage every second
        const interval = setInterval(() => {
            const updatedHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
            if (JSON.stringify(updatedHistory) !== JSON.stringify(history)) {
            setHistory(updatedHistory);
            }
        }, 1000);
    
        return () => {
            clearInterval(interval); // Clean up the interval when the component unmounts
        };
    }, []);

    return (
        <div className={`mt-4 p-4 flex flex-col gap-3 w-full ${history.length == 0 ? 'hidden': ''}`}>
            <h1 className='text-lg'>My Quizzes</h1>
            <hr className='mb-3'></hr>

            {/* Quiz History */}
            <div className="flex flex-col gap-3">
                {history.reverse().map((quiz, index) => (
                    <div className="flex items-center gap-3" key={index}>
                        <a  className="flex items-center gap-3" href={`/quiz/${quiz.quizId}`} target='_blank'>
                          <ArticleIcon />

                            <h6>
                                {JSON.stringify(JSON.parse(quiz.title))}
                            </h6>
                            <p className='text-gray-500'>
                                ({JSON.stringify(quiz.questions.length)} questions)
                            </p>
    
                        </a>
                        
                        <Button component="a" href={`/quiz/${quiz.quizId}`} target='_blank' variant="" className='text-center ml-auto'>
                            View Quiz
                        </Button>

                        <Button className='text-center text-black' onClick={
                            () => {
                                navigator.clipboard.writeText(quiz.quizId);
                            }
                        }>
                            Copy Quiz ID
                        </Button> 
                    </div>
                ))}
            </div>
        </div>
    )
}
