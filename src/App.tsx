import { Login } from './components/Login/Login';
import { Titlebar } from './components/Titlebar/Titlebar';

function App() {
	return (
		<>
			<Titlebar />
			<section style={{ marginTop: '20px' }}>
				<Login />
			</section>
		</>
	);
}

export default App;
