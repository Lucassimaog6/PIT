import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";

import Login from './Pages/Login/index';
import Register from './Pages/Register/index';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Project from './Pages/Project';
import Filter from './Pages/Filter';
import Auth0 from "./Pages/Auth0.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
	<Auth0Provider
		domain='dev-1ey1lh2q2hux3w6g.us.auth0.com'
		clientId='cZO85TBx2RFzIjgUcK5vTsJ434NO7mI5'
		authorizationParams={{
			redirect_uri: window.location.origin
		}}
	>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Auth0Provider>

);

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={<Auth0/>}
			/>
			<Route
				path='/register'
				element={<Register />}
			/>
			<Route
				path='/login'
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
			<Route
				path='/project/filter'
				element={<Filter />}
			/>
		</Routes>
	);
}
