"use client";
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import Button from '@mui/material/Button';

export default function GenerateQuizForm() {

  const [loading, setLoading] = useState(false);

  // States for the form inputs
  const [subject, setSubject] = useState(null);
  const [subjectInput, setSubjectInput] = useState('');

  const [numQuestions, setNumQuestions] = useState("");

  const [gradeLevel, setGradeLevel] = useState(null);
  const [gradeLevelInput, setGradeLevelInput] = useState('');

  const gradeLevelOptions = [
    { group: 'Elementary', label: 'Grade 1' },
    { group: 'Elementary', label: 'Grade 2' },
    { group: 'Elementary', label: 'Grade 3' },
    { group: 'Elementary', label: 'Grade 4' },
    { group: 'Elementary', label: 'Grade 5' },
    { group: 'Elementary', label: 'Grade 6' },
    { group: 'Elementary', label: 'Grade 7' },
    { group: 'Elementary', label: 'Grade 8' },
    { group: 'Secondary', label: 'Grade 9' },
    { group: 'Secondary', label: 'Grade 10' },
    { group: 'Secondary', label: 'Grade 11' },
    { group: 'Secondary', label: 'Grade 12' },
    { group: 'University/College', label: 'Year 1' },
    { group: 'University/College', label: 'Year 2' },
    { group: 'University/College', label: 'Year 3' },
    { group: 'University/College', label: 'Year 4' },
    { group: 'University/College', label: 'Year 4+' },
  ];

  const [language, setLanguage] = useState(null);
  const [languageInput, setLanguageInput] = useState('');
  const [instructions, setInstructions] = useState('');
  const [fileURL, setFileURL] = useState('');

  const [uploadedFile, setUploadedFile] = useState(null);
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  function formDataToObject(formData) {
    let obj = {};
    for (let pair of formData.entries()) {
        obj[pair[0]] = pair[1];
    }
    return obj;
}

  const submit = async () => {

      setLoading(true);

      const formData = new FormData();
      formData.append('subject', subjectInput);
      formData.append('instructions', languageInput ? instructions + `\n Note: The quiz will be generated in the following language: ${languageInput}` : instructions); // default to empty string if no instructions provided
      formData.append('gradeLevel', gradeLevelInput);
      formData.append('numQuestions', numQuestions.toString());

      if (fileURL) {
        formData.append('pdfLinks', JSON.stringify([fileURL]));
      }

      if (uploadedFile) {
        formData.append('files', [uploadedFile]);
      }

      console.log(formDataToObject(formData));
      console.log([uploadedFile])
      
      const response = await fetch('https://api.arlinear.com/functions/v1/generate-quiz', {
        method: 'POST',
        headers: {
            Authorization: "b4ae786a-62f5-4924-8d00-7aeae8683e4c"
        },
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);

          const quizzes = data.quizzes;

          // add quiz to history in local storage
          const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
          quizHistory.push(quizzes[0]);
          localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
          
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });

      console.log(response);
        
  };

  return (
      <form className={`white-bg rounded border shadow-md p-4 flex flex-col gap-3 w-full ${loading ? "pointer-events-none animate-pulse" : ""}`}>
        <div className='flex flex-row items-center justify-between gap-3'>
          <h1 className='text-lg'>Generate a Quiz</h1>
          <Button component="a" href="https://arlinear.gitbook.io/documentation/" target='_blank' variant="" className='text-center'>
              API Documentation
          </Button>
        </div>
        <hr className='mb-3'></hr>

        <div className="grid grid-cols-2 gap-3">

          {/* Subject */}
          <Autocomplete
              freeSolo
              value={subject}
              onChange={(event, newValue) => {
                setSubject(newValue);
              }}
              inputValue={subjectInput}
              onInputChange={(event, newInputValue) => {
                setSubjectInput(newInputValue);
              }}
              options={["Math", "Science", "Language", "History", "Geography", "Art"]}
              renderInput={(params) => <TextField {...params} label="Subject" />}
            />

            {/* Grade Level */}
            <Autocomplete
              freeSolo
              value={gradeLevel}
              onChange={(event, newValue) => {
                setGradeLevel(newValue);
              }}
              inputValue={gradeLevelInput}
              onInputChange={(event, newInputValue) => {
                setGradeLevelInput(newInputValue);
              }}
              options={gradeLevelOptions}
              groupBy={(option) => option.group}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => <TextField {...params} label="Grade Level" />}
            />

            {/* # of Questions */}
            <TextField 
              value={numQuestions} 
              onChange={(e) => setNumQuestions(e.target.value)}
              label="Number of Questions"
              type="number"
              min={1}
              max={100}
            />

            {/* Language */}
            <Autocomplete
              freeSolo
              value={language}
              onChange={(event, newValue) => {
                setLanguage(newValue);
              }}
              inputValue={languageInput}
              onInputChange={(event, newInputValue) => {
                setLanguageInput(newInputValue);
              }}
              options={["English", "French", "Spanish", "German", "Mandarin", "Farsi", "Arabic", "Russian"]}
              renderInput={(params) => <TextField {...params} label="Quiz Language" />}
            />
          </div>

          <div>

              <label className='text-gray-500 text-sm'>Generate Quiz From a PDF: </label>

            <div className="flex flex-row items-center gap-3">

              {/* Upload File */}
              {/* <Button component="label" variant="contained" className='w-32 text-center'>
                Upload file
                <input 
                  type="file" 
                  style={{ opacity: '0', position: 'absolute', zIndex: "-99" }} 
                  onChange={handleFileChange}
                />
              </Button>
              {uploadedFile ? `(${uploadedFile.name})` : ""}

              <span className='text-center text-gray-500 text-sm h-fit'>Or</span> */}

              {/* File URL */}
              <TextField className='w-full' label="File Link" variant="outlined" type="url" onChange={(e) => setFileURL(e.target.value)}/>
            </div>
          </div>

          <TextField
            label="What is your quiz about?"
            multiline
            value={instructions}
            onChange={(event) => {
              setInstructions(event.target.value);
            }}
          />

          <Button component="label" variant="contained" onClick={submit}>
            {loading ? 
              "Loading..." : 
              "Generate Quiz"
            }
          </Button>
      </form>
      
  )
}
