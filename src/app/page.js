/* use client */
import * as React from 'react';
import GenerateQuizForm from '../app/components/GenerateQuizForm';
import QuizHistory from '../app/components/QuizHistory';

export default function Home() {
  return (
    <main className="max-w-[900px] mx-auto py-24 px-2 md:px-24">

    <div className="flex flex-col items-center gap-3">
      <GenerateQuizForm />
      <QuizHistory />
    </div>

  </main>
  )
}
