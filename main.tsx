import React from 'react'
import ReactDOM from 'react-dom/client'
import QuizApp from './QuizApp' // 确保这里指向的是 QuizApp
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QuizApp />
  </React.StrictMode>,
)