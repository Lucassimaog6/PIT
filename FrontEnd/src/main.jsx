import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/index';
import Register from './Pages/Register/index';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Project from './Pages/Project';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

function App() {
	return (
		<Routes>
			<Route
				path='/register'
				element={<Register />}
			/>
			<Route
				path='/'
				element={<Login />}
			/>
			<Route
				path='/home'
				element={<Home />}
			/>
			<Route
				path='/profile'
				element={<Profile />}
			/>
			<Route
				path='/project/new'
				element={<Project />}
			/>
		</Routes>
	);
}
