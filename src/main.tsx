import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '/Users/stephanetraore/Desktop/StageDocs/PBailleur/src/assets/fonts/helvetica-bold.otf'
import '/Users/stephanetraore/Desktop/StageDocs/PBailleur/src/assets/fonts/helvetica-roman.otf'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
