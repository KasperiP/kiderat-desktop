import { LoadingButton } from '@mui/lab';
import { Alert, Box, Link, TextField, Typography } from '@mui/material';
import { getVersion } from '@tauri-apps/api/app';
import { Body, ResponseType, getClient } from '@tauri-apps/api/http';
import { open } from '@tauri-apps/api/shell';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/ContextProvider';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ field: '', message: '' });
	const [version, setVersion] = useState('');

	const ctx = useContext(GlobalContext);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const ver = await getVersion();
			setVersion(ver);
		})();
	}, []);

	const handleLogin = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();

		// Validate email
		const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
		if (!emailRegex.test(email)) {
			return setError({
				field: 'email',
				message: 'Kelvoton sähköpostiosoite.',
			});
		}

		// Validate password
		if (password.length < 6) {
			return setError({
				field: 'password',
				message: 'Kelvoton salasana.',
			});
		}

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

		if (userResponse.status !== 200 || authResponse.status !== 200) {
			setError({
				field: '',
				message: 'Kelvoton sähköpostiosoite tai salasana.',
			});
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
			}}
		>
			<div
				style={{
					backgroundImage: "url('/city.svg')",
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					width: '100vw',
					position: 'fixed',
					opacity: 0.08,
					filter: 'grayscale(1)',
					height: 'calc(100vh - 32px)',
				}}
			></div>

			<Box
				component={'form'}
				autoComplete="off"
				autoCorrect="off"
				noValidate
				onSubmit={handleLogin}
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					gap: '25px',
					width: '50%',
					height: '100%',
					padding: 40,
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
				<Typography variant="body1" fontWeight={400}>
					Kirjaudu sisään käyttäen <strong>Kide.app</strong>{' '}
					tunnuksiasi. Emme tallenna kirjautumistietojasi. Sovellus
					pohjautuu avoimeen{' '}
					<Link
						href="#"
						onClick={async () =>
							await open(
								'https://github.com/KasperiP/kiderat-desktop'
							)
						}
						sx={{ color: '#5c34ad', textDecoration: 'none' }}
					>
						lähdekoodiin
					</Link>
					.
				</Typography>
				{error.message && (
					<Alert severity="error">{error.message}</Alert>
				)}
				<TextField
					required
					label="Sähköposti"
					type="email"
					error={error.field === 'email'}
					value={email}
					disabled={loading}
					onChange={(e) => {
						if (error) setError({ field: '', message: '' });
						setEmail(e.target.value);
					}}
				/>
				<TextField
					required
					label="Salasana"
					type="password"
					error={error.field === 'password'}
					value={password}
					disabled={loading}
					onChange={(e) => {
						if (error) setError({ field: '', message: '' });
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
							lineHeight: 1,
							fontSize: '4.5rem',
							backgroundImage:
								'linear-gradient(90deg, #5c34ad, #a3a3ad)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						Kide.rat
					</Typography>
					<Typography
						variant="body1"
						fontSize={12}
						color="#0f0f0f60"
						sx={{
							position: 'absolute',
							bottom: 10,
							right: 20,
						}}
					>
						Version: v{version}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};
