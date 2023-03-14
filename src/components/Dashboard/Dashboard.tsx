import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/ContextProvider';

export const Dashboard = () => {
	const ctx = useContext(GlobalContext);

	const navigate = useNavigate();

	return (
		<div style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
			<button onClick={() => navigate('/')}>debug</button>
			<p>Alla olevat tiedot on haettu Kide.app-rajapinnasta.</p>
			<h1>Email: {ctx?.user?.email}</h1>
			<p>Nimi: {ctx?.user?.fullName}</p>
			<p>Puhelin: {ctx?.user?.phone}</p>
			<p>ID: {ctx?.user?.id}</p>
		</div>
	);
};
