import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sobrenos from "./Pages/Landing/sobrenos";

import './index.css';

import Filter from './Pages/Filter';
import Home from './Pages/Home';
import Landing from "./Pages/Landing";
import Profile from './Pages/Profile';
import Project from './Pages/Project';
import ProjectID from './Pages/Project/ProjectID';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth0Provider
        domain='dev-1ey1lh2q2hux3w6g.us.auth0.com'
        clientId='cZO85TBx2RFzIjgUcK5vTsJ434NO7mI5'
        authorizationParams={{
            redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        }}
    >
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Auth0Provider>
);

function App() {
    return (
        <Routes>
            <Route
                path='/'
                element={<Landing/>}
            />
            <Route
                path='/home'
                element={<Home/>}
            />
            <Route
                path='/profile'
                element={<Profile/>}
            />
            <Route
                path='/project/new'
                element={<Project/>}
            />
            <Route
                path='/project/filter'
                element={<Filter/>}
            />
            <Route 
                path='/p/:id'
                element={<ProjectID/>}
            />
            <Route
            path='/sobrenos'
            element={<Sobrenos/>}
            />
        </Routes>
    );
}
