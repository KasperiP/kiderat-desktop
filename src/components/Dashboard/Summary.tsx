import { Box, Button, Chip, Typography } from '@mui/material';
import { open } from '@tauri-apps/api/shell';
import { useContext } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { GlobalContext } from '../../context/ContextProvider';
import { StepContext } from '../../pages/Dashboard';
import { TimeDisplay } from '../TimeDisplay/TimeDisplay';
import { ButtonRow } from './ButtonRow';

export const Summary = () => {
	const stepCtx = useContext(StepContext);
	const globalCtx = useContext(GlobalContext);

	const handleNext = () => {
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
						<AiOutlineCheckCircle
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
							Yhteenveto
						</Typography>
					</Box>
					<Typography variant="body1" color="#0d0f11">
						Tässä on yhteenveto asetuksistasi. Voit muokata niitä
						menemällä takaisin asetuksiin.
					</Typography>
					<Typography variant="body1" color="#0d0f11" pt={2}>
						<strong>Tapahtuma: </strong>{' '}
						<Chip
							label={globalCtx?.event?.product.name}
							color="primary"
							size="small"
						/>
					</Typography>

					<Typography variant="body1" color="#0d0f11">
						<strong>Myynnin alkuun: </strong>{' '}
						<TimeDisplay
							date={
								new Date(
									globalCtx?.event?.product
										.dateSalesFrom as any
								)
							}
						/>
					</Typography>

					<Typography variant="body1" color="#0d0f11">
						<strong>Sijainti:</strong>{' '}
						{globalCtx?.event?.product?.streetAddress},{' '}
						{globalCtx?.event?.product?.city}
					</Typography>

					<Box mt={2}>
						<Button
							variant="outlined"
							onClick={async () =>
								await open(
									`https://kide.app/events/${globalCtx?.event?.product.id}`
								)
							}
						>
							Avaa tapahtumasivu
						</Button>
					</Box>
				</Box>
				<Box
					sx={{
						width: '50%',
					}}
				>
					<img
						src="/summary.svg"
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
