import { Alert, Box, TextField, Typography } from '@mui/material';
import { ResponseType, getClient } from '@tauri-apps/api/http';
import { useContext, useState } from 'react';
import { BiBeer } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/ContextProvider';
import { IEvent } from '../../interfaces/interfaces';
import { StepContext } from '../../pages/Dashboard';
import { ButtonRow } from './ButtonRow';

export const Event = () => {
	const [url, setUrl] = useState('');
	const [error, setError] = useState({ field: '', message: '' });
	const [loading, setLoading] = useState(false);

	const stepCtx = useContext(StepContext);
	const globalCtx = useContext(GlobalContext);
	const navigate = useNavigate();

	const getEvent = async (id: string) => {
		const client = await getClient();

		const eventResponse = await client.get<{ model: IEvent }>(
			`https://api.kide.app/api/products/${id}`,
			{
				responseType: ResponseType.JSON,
			}
		);
		if (eventResponse.data.model) {
			if (eventResponse.data.model.product.salesEnded) {
				throw new Error('Tapahtuman lipunmyynti on päättynyt.');
			}

			globalCtx?.setState((prev) => ({
				...prev,
				event: eventResponse.data.model,
			}));
		} else {
			throw new Error('Tapahtumaa ei löytynyt.');
		}
	};

	const handleNext = async () => {
		setLoading(true);
		try {
			const id = url.split('/').pop();

			if (!id || id.length !== 36) {
				return setError({
					field: 'url',
					message: 'Kelvoton URL-osoite.',
				});
			}

			await getEvent(id);
			stepCtx.setActiveStep((prev) => prev + 1);
		} catch (error: any) {
			setError({
				field: 'url',
				message: error.message
					? error.message
					: 'Tapahtuman haku epäonnistui.',
			});
		} finally {
			setLoading(false);
		}
	};

	const handleBack = () => {
		navigate('/');
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setError({ field: '', message: '' });
		setUrl(event.target.value);
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
						<BiBeer
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
							Valitse tapahtuma
						</Typography>
					</Box>
					<Typography variant="body1" color="#0d0f11" py={1}>
						Syötä <strong>Kide.app</strong>-tapahtuman URL-osoite,
						johon haluat varata lippuja.
					</Typography>
					{error.message && (
						<Alert severity="error" sx={{ marginBottom: 2 }}>
							{error.message}
						</Alert>
					)}
					<TextField
						label="URL-osoite"
						required
						onChange={handleChange}
						value={url}
						disabled={loading}
						error={error.field === 'url'}
					/>
				</Box>
				<Box
					sx={{
						width: '50%',
					}}
				>
					<img src="/party.svg" alt="" draggable={false} />
				</Box>
			</Box>
			<ButtonRow
				handleNext={handleNext}
				handleBack={handleBack}
				loading={loading}
			/>
		</>
	);
};
