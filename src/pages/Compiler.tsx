import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { apiRequest } from '../api/apiRequest';

const CompilerPage: React.FC = () => {
  const [code, setCode] = useState(`public class Solution { 
    public static void main(String[] args) { 
        System.out.println("Hello world");
    } 
  }`);
  const [language, setLanguage] = useState('java'); // Default language
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };
    
    try {
      const data = await apiRequest('http://localhost:8080/api/execute', "POST" ,payload);
      setOutput(data); // Process backend response
    } catch (error) {
        if (error instanceof Error) {
          console.log('error occured while executing');
          console.error(error.message); // Safely access the error's message property
        } else {
          console.error('An unknown error occurred');
        }
    }
  };

  return (
    <div>
      <h1>Online Code Compiler</h1>
      <div>
        <label htmlFor="language">Select Language: </label>
        <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
        </select>
      </div>
      <Editor
        height="300px"
        defaultLanguage={language} // Dynamically set the editor language
        defaultValue={code}
        onChange={(value) => setCode(value || '')}
      />
      <textarea
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Program input"
      ></textarea>
      <button onClick={handleSubmit}>Run</button>
      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CompilerPage;
