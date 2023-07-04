import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { Suspense } from 'react';
import { IconContext } from 'react-icons';

export default function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Suspense Loading...</div>}>
                <IconContext.Provider value={{ className: 'w-6 h-6' }}>
                    <Router />
                </IconContext.Provider>
            </Suspense>
        </BrowserRouter>
    );
}
