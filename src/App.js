import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleEqual = () => {
    try {
      // Using Function constructor instead of eval for better security
      const calculatedResult = new Function('return ' + input)();
      setResult(calculatedResult.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-80">
        <div className="mb-4">
          <input
            type="text"
            value={input}
            readOnly
            className="w-full p-2 text-xl border rounded text-right"
          />
          <div className="text-right mt-2 text-gray-600">
            {result && <span>= {result}</span>}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((item) => (
            <button
              key={item}
              onClick={() => item === '=' ? handleEqual() : handleClick(item)}
              className={`p-4 text-xl rounded ${
                item === '='
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {item}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="col-span-2 bg-red-500 p-4 text-xl rounded hover:bg-red-600 text-white"
          >
            Clear
          </button>
          <button
            onClick={handleBackspace}
            className="col-span-2 bg-yellow-500 p-4 text-xl rounded hover:bg-yellow-600 text-white"
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;