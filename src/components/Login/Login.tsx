import { Box, Button, TextField, Typography } from '@mui/material';
import { AiOutlineLogin } from 'react-icons/ai';

export const Login = () => {
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
					onSubmit={() => null}
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
						tunnuksiasi. Emme tallenna kirjautumistietojasi. Lue
						lisää <a href="/">tietosuojasta</a>.
					</Typography>
					<TextField required label="Sähköposti" type="email" />
					<TextField required label="Salasana" type="password" />
					<Button variant="contained">Kirjaudu</Button>
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
								// Gradient text
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
