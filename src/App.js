import React from 'react';
import './App.css';
import Questions from './components/Questions';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div>
      <ErrorBoundary>
        <Questions />
      </ErrorBoundary>
    </div>
  );
}

export default App;
