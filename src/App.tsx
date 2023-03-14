import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Login } from './components/Login/Login';
import { Titlebar } from './components/Titlebar/Titlebar';

function App() {
	document.addEventListener('contextmenu', (e) => {
		if (window.location.hostname.includes('localhost')) return;
		e.preventDefault();
	});

	return (
		<>
			<Titlebar />
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
