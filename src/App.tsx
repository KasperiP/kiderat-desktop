import { invoke } from '@tauri-apps/api/tauri';
import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Titlebar } from './components/Titlebar/Titlebar';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';

const App = () => {
	/**
	 * Disable right click
	 */
	document.addEventListener('contextmenu', (e) => {
		e.preventDefault();
	});

	/**
	 * Disable F5 key
	 */
	document.addEventListener('keydown', (e) => {
		if (e.key === 'F5') {
			e.preventDefault();
		}
	});

	/**
	 * Close splashscreen after 3 seconds
	 */
	useEffect(() => {
		setTimeout(() => {
			invoke('close_splashscreen');
		}, 3000);
	}, []);

	return (
		<>
			<Titlebar />
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="*" element={<Login />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
