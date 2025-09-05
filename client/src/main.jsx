import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import { ContextProvider } from './context/UserContext.jsx';
import { GroupProvider } from './context/GroupContext.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ContextProvider>
            <GroupProvider>
                <App />
            </GroupProvider>
        </ContextProvider>
    </BrowserRouter>
)