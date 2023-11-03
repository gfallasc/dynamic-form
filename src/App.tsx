import './App.css';
import React from 'react';
import { useSelector } from "react-redux";
import { ThemeProvider } from 'styled-components';
import { JobApplicationForm } from './JobApplicationForm/JobApplicationForm';
import { AppState } from './appStore';
import ThankYouPage from './ThankYouPage/ThankYouPage';
import theme from './ui/theme';

function App() {
  const isSubmitted = useSelector((state: AppState) => state.form.isSubmitted);
  const formData = useSelector((state: AppState) => state.form.values)

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {
          isSubmitted ? <ThankYouPage formData={formData} /> : <JobApplicationForm />
        }
      </ThemeProvider>
    </div>
  );
}

export default App;
