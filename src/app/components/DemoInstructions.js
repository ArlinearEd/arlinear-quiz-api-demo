"use client";
import React from 'react';

function Intruction({title, body, icon}){
    return (
        <div className='flex flex-col gap-2 basis-1/3'>
            <img className='w-14 mb-1' src={icon} />
            <h3 className='text-md font-bold'>{title}</h3>
            <div className='flex flex-col gap-2'>
                {body.map((item, index) => (
                    <p key={index} className='opacity-80 text-sm even:font-bold'>{item}</p>
                ))}
            </div>
        </div>
    )
}

export default function DemoInstructions() {

    const instructions = [
        {
            title: '1. Generate a Quiz',
            body: ['Click the "Generate Quiz" button to generate a quiz. You will be redirected to the quiz page.', 'Pro tip: You can upload a PDF file (i.e a lesson, textbook, short story, etc)'],
            icon: '/icons/quiz.png'
        },
        {
            title: '2. Take Your Quiz',
            body: ['Click "View Quiz" to see and take your quiz.'],
            icon: '/icons/pencil.png'
        },
        {
            title: '3. Auto-Grade the Quiz!',
            body: ['Grade the quiz automatically by clicking the “Submit” button at the end of the quiz.'],
            icon: '/icons/grade.png'
        }
    ]

    return (
        <div className='w-3/4 mx-auto sm:w-full flex flex-col sm:flex-row justify-center gap-6 mb-12'>
            {instructions.map((instruction, index) => (
                <Intruction 
                    key={index}
                    title={instruction.title}
                    body={instruction.body}
                    icon={instruction.icon}
                />
            ))}
        </div>
    )
}
