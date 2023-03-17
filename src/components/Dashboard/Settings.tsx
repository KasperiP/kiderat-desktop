import { Box, TextField, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { ChangeEvent, useContext } from 'react';
import { FiSettings } from 'react-icons/fi';
import { GlobalContext } from '../../context/ContextProvider';
import { StepContext } from '../../pages/Dashboard';
import { ButtonRow } from './ButtonRow';

export const Settings = () => {
	const stepCtx = useContext(StepContext);
	const globalCtx = useContext(GlobalContext);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = (event.target as HTMLInputElement).value;
		if (value === 'max') {
			globalCtx?.setState((prev) => ({
				...prev,
				settings: {
					amount: null,
				},
			}));
		} else {
			globalCtx?.setState((prev) => ({
				...prev,
				settings: {
					amount: 1,
				},
			}));
		}
	};

	const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
		const num = parseInt((event.target as HTMLInputElement).value);
		if (isNaN(num) || num < 1) return;

		globalCtx?.setState((prev) => ({
			...prev,
			settings: {
				amount: num,
			},
		}));
	};

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
							Hallitse asetuksia
						</Typography>
					</Box>
					<Typography variant="body1" color="#0d0f11">
						Muokkaa tapahtuman asetuksia, kuten varattujen lippujen
						määrää.
					</Typography>
					<FormControl>
						<FormLabel id="radio-buttons-group">
							Kuinka monta lippua haluat varata?
						</FormLabel>
						<RadioGroup
							aria-labelledby="radio-buttons-group"
							name="controlled-radio-buttons-group"
							value={
								globalCtx?.settings.amount === null
									? 'max'
									: 'custom'
							}
							onChange={handleChange}
						>
							<FormControlLabel
								value="max"
								control={<Radio />}
								label="Maksimi"
							/>
							<FormControlLabel
								value="custom"
								control={<Radio />}
								label="Valittu määrä"
							/>
						</RadioGroup>
					</FormControl>
					{globalCtx?.settings.amount !== null && (
						<TextField
							label="Lippujen määrä"
							required
							value={globalCtx?.settings.amount}
							onChange={handleAmountChange}
							inputProps={{
								inputMode: 'numeric',
								pattern: '[0-9]*',
							}}
						/>
					)}
				</Box>
				<Box
					sx={{
						width: '50%',
					}}
				>
					<img
						src="/settings.svg"
						alt=""
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
