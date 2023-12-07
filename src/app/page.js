/* use client */
import * as React from 'react';
import GenerateQuizForm from '../app/components/GenerateQuizForm';
import QuizHistory from '../app/components/QuizHistory';
import DemoInstructions from '../app/components/DemoInstructions';

export default function Home() {
  return (
    <main className="max-w-[900px] mx-auto pb-24 px-2 md:px-24">

    <div className="flex flex-col items-center gap-3">

      <a href='https://arlinear.com/' 
          target='_blank' 
          className='block my-14'
      >
        <img className='w-24 md:w-36 mx-auto' src='/arlinear-logo-wordmark.png' />
        <h1 className='text-center mt-2'>Quiz Generator / Automatic Grader Demo</h1>
      </a>

      <DemoInstructions />

      <GenerateQuizForm />
      <QuizHistory />
    </div>

  </main>
  )
}
