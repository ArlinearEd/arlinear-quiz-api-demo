"use client";
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';
import QuizPreview from './QuizPreview';

export default function QuizHistory() {

    const [history, setHistory] = useState([]);
    const [selectedQuizId, setSelectedQuizId] = useState(null);

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
                        <ArticleIcon />
                        <h6>
                            { index + 1 }. {JSON.stringify(JSON.parse(quiz.title))}
                        </h6>
                        <p className='text-gray-500 grow'>
                            ({JSON.stringify(quiz.questions.length)} questions)
                        </p>
                        <Button 
                            className='text-center'
                            onClick={() => {

                                // select quiz
                                setSelectedQuizId(quiz.quizId);

                                // scroll to #QuizPreview
                                const quizPreview = document.getElementById("quizPreview");
                                quizPreview.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            View Quiz
                        </Button>
                    </div>
                ))}
            </div>

            {/* Selected Quiz */}
            <div id="quizPreview" className={ selectedQuizId ? '' : 'opacity-0'}> 
                <QuizPreview quizId={selectedQuizId}/>
            </div>
            
        </div>
    )
}
