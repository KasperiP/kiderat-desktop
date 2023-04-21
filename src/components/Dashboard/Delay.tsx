import { Alert, Box, TextField, Typography } from '@mui/material';
import { ChangeEvent, useContext, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { GlobalContext } from '../../context/ContextProvider';
import { StepContext } from '../../pages/Dashboard';
import { ButtonRow } from './ButtonRow';

export const Delay = () => {
	const [error, setError] = useState({ field: '', message: '' });

	const stepCtx = useContext(StepContext);
	const globalCtx = useContext(GlobalContext);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		let num = Number(event.target.value);
		globalCtx?.setState({
			...globalCtx,
			settings: {
				...globalCtx?.settings,
				[event.target.name]: isNaN(num) ? 0 : num,
			},
		});
	};

	const handleNext = (e?: any) => {
		e?.preventDefault();
		if (
			!globalCtx?.settings.retryEventRefreshDelay ||
			globalCtx?.settings.retryEventRefreshDelay <= 0
		) {
			return setError({
				field: 'retryEventRefreshDelay',
				message: 'Virheellinen arvo.',
			});
		}

		if (
			!globalCtx?.settings.retryTicketReserveDelay ||
			globalCtx?.settings.retryTicketReserveDelay <= 0
		) {
			return setError({
				field: 'retryTicketReserveDelay',
				message: 'Virheellinen arvo.',
			});
		}

		stepCtx.setActiveStep(stepCtx.activeStep + 1);
	};

	const handleBack = () => {
		stepCtx.setActiveStep(stepCtx.activeStep - 1);
	};

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '50px',
				}}
			>
				<Box
					component={'form'}
					autoComplete="off"
					autoCorrect="off"
					onSubmit={handleNext}
					noValidate
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '5px',
						width: '50%',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
						}}
					>
						<FiSettings
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
							Viive
						</Typography>
					</Box>
					<Typography variant="body2" color="#0d0f11" mt={1}>
						Muokkaa viivettä, jonka jälkeen botti yrittää tapahtumaa
						uudelleen. Vakioviiveet on todettu toimiviksi, mutta
						voit muokata niitä tarpeesi mukaan.
					</Typography>
					{error.message && (
						<Alert severity="error" sx={{ mt: 1 }}>
							{error.message}
						</Alert>
					)}
					<TextField
						sx={{ mt: 2 }}
						label="Tapahtuman päivitysviive (ms)"
						required
						value={globalCtx?.settings.retryEventRefreshDelay}
						onChange={handleChange}
						id="retryEventRefreshDelay"
						name="retryEventRefreshDelay"
						error={error.field === 'retryEventRefreshDelay'}
						inputProps={{
							inputMode: 'numeric',
							pattern: '[0-9]*',
						}}
					/>
					<TextField
						sx={{ mt: 2 }}
						label="Lipun varausviive (ms)"
						required
						value={globalCtx?.settings.retryTicketReserveDelay}
						onChange={handleChange}
						name="retryTicketReserveDelay"
						id="retryTicketReserveDelay"
						error={error.field === 'retryTicketReserveDelay'}
						inputProps={{
							inputMode: 'numeric',
							pattern: '[0-9]*',
						}}
					/>
				</Box>
				<Box
					sx={{
						width: '50%',
					}}
				>
					<img
						src="/settings.svg"
						style={{ maxWidth: '100%' }}
						draggable={false}
					/>
				</Box>
			</Box>
			<ButtonRow
				loading={false}
				handleNext={handleNext}
				handleBack={handleBack}
			/>
		</>
	);
};
