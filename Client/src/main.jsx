import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import App from './App.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
 // <StrictMode>
 <SocketProvider>
    <App />
    <Toaster closeButton/>
  </SocketProvider>  
 // </StrictMode>,
)
