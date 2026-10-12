import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { startClock } from './store/useClockStore.js'
import './styles/tokens.css'
import './styles/base.css'

startClock()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
