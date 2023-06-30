import { Route, Routes } from 'react-router-dom';
import Authoring from './Authoring';

export default function Router() {
    return (
        <Routes>
            <Route path="/:frameId" element={<Authoring />}></Route>
            <Route path="/*" element={<div>404</div>}></Route>
        </Routes>
    );
}
