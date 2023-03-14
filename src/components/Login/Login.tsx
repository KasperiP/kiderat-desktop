import { LoadingButton } from '@mui/lab';
import { Alert, Box, Link, TextField, Typography } from '@mui/material';
import { Body, ResponseType, getClient } from '@tauri-apps/api/http';
import { open } from '@tauri-apps/api/shell';
import { FormEvent, useContext, useState } from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/ContextProvider';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const ctx = useContext(GlobalContext);

	const navigate = useNavigate();

	const handleLogin = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();

		setLoading(true);

		const client = await getClient();

		const authBody = Body.text(
			`client_id=56d9cbe22a58432b97c287eadda040df&grant_type=password&password=${password}&rememberMe=true&username=${email}`
		);

		const authResponse: any = await client.post(
			'https://auth.kide.app/oauth2/token',
			authBody,
			{
				responseType: ResponseType.JSON,
			}
		);

		const userResponse = await client.get<any>(
			'https://api.kide.app/api/authentication/user',
			{
				headers: {
					Authorization: `Bearer ${authResponse.data.access_token}`,
				},
				responseType: ResponseType.JSON,
			}
		);

		setLoading(false);

		console.log(userResponse.status);
		console.log(authResponse.status);

		if (userResponse.status !== 200 || authResponse.status !== 200) {
			setError('Invalid email or password');
			return;
		}

		ctx?.setState({
			...ctx,
			authorizationToken: authResponse.data.access_token,
			user: userResponse.data.model,
		});

		navigate('/dashboard');
	};

	return (
		<Box
			sx={{
				height: 'calc(100vh - 32px)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '0 40px',
				userSelect: 'none',
			}}
		>
			<div
				style={{
					backgroundImage: "url('/login_bg.svg')",
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					height: 'calc(100vh - 32px)',
					width: '100vw',
					position: 'fixed',
					opacity: 0.1,
					filter: 'grayscale(1)',
				}}
			></div>
			<Box
				sx={{
					display: 'flex',
					width: '100%',
					maxWidth: '1000px',
					justifyContent: 'center',
					backgroundColor: '#fff',
					boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.1)',
					padding: '20px',
					borderRadius: 5,
					gap: '40px',
					alignItems: 'center',
					zIndex: 1,
					height: '100%',
					maxHeight: '500px',
				}}
			>
				<Box
					component={'form'}
					onSubmit={handleLogin}
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						gap: '25px',
						width: '50%',
						maxWidth: '500px',
						backgroundColor: '#f3f5f990',
						height: '100%',
						padding: '80px 40px',
						borderRadius: 10,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
						}}
					>
						<AiOutlineLogin
							size={40}
							color="#fff"
							style={{
								backgroundColor: '#5c34ad',
								borderRadius: '50%',
								padding: '5px',
							}}
						/>
						<Typography
							variant="h4"
							fontWeight={500}
							lineHeight={0.5}
							color="#0d0f11"
						>
							Kirjaudu sisään
						</Typography>
					</Box>
					<Typography
						variant="body1"
						fontWeight={400}
						color="#a3a3ad"
					>
						Kirjaudu sisään käyttäen <strong>Kide.app</strong>{' '}
						tunnuksiasi. Emme tallenna kirjautumistietojasi.
						Sovellus pohjautuu avoimeen{' '}
						<Link
							href="#"
							onClick={async () =>
								await open('https://kide.app/tietosuojaseloste')
							}
							sx={{ color: '#5c34ad', textDecoration: 'none' }}
						>
							lähdekoodiin
						</Link>
						.
					</Typography>
					{error && <Alert severity="error">{error}</Alert>}
					<TextField
						required
						label="Sähköposti"
						type="email"
						value={email}
						disabled={loading}
						onChange={(e) => {
							if (error) setError('');
							setEmail(e.target.value);
						}}
					/>
					<TextField
						required
						label="Salasana"
						type="password"
						value={password}
						disabled={loading}
						onChange={(e) => {
							if (error) setError('');
							setPassword(e.target.value);
						}}
					/>
					<LoadingButton
						variant="contained"
						size={'large'}
						type="submit"
						loading={loading}
					>
						Kirjaudu
					</LoadingButton>
				</Box>
				<Box
					sx={{
						height: '100%',
						width: '50%',
						borderRadius: 5,
						position: 'relative',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							backgroundImage: "url('/rat_bg.svg')",
							backgroundSize: 'cover',
							height: '100%',
							width: '100%',
							position: 'absolute',
							filter: 'grayscale(1)',
							opacity: 0.1,
							borderRadius: 10,
						}}
					></div>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '100%',
							flexDirection: 'column',
						}}
					>
						<Box
							sx={{
								transition: 'transform 0.5s ease-in-out',
								'&:hover': {
									transform: 'rotate(-3deg) scale(1.05)',
								},
							}}
						>
							<img
								src="/kiderat_logo.svg"
								width={212}
								height={212}
								style={{
									filter: 'invert(16%) sepia(85%) saturate(2793%) hue-rotate(253deg) brightness(96%) contrast(86%)',
								}}
								draggable={false}
							/>
						</Box>

						<Typography
							variant="h6"
							sx={{
								textTransform: 'uppercase',
								fontWeight: 700,
								fontSize: '4.5rem',
								backgroundImage:
									'linear-gradient(90deg, #5c34ad, #a3a3ad)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
							}}
						>
							Kide.rat
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
