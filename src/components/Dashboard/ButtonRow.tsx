import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepContext } from '../../pages/Dashboard';

interface ButtonRowProps {
	handleNext: () => void;
	handleBack: () => void;
	loading: boolean;
}

export const ButtonRow = ({
	handleNext,
	handleBack,
	loading,
}: ButtonRowProps) => {
	const navigate = useNavigate();

	const ctx = useContext(StepContext);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
			{ctx.activeStep == 0 ? (
				<Button
					color="inherit"
					onClick={() => navigate('/')}
					sx={{ mr: 1 }}
				>
					Takaisin kirjautumiseen
				</Button>
			) : (
				<Button
					color="inherit"
					onClick={handleBack}
					sx={{ mr: 1 }}
					disabled={ctx.activeStep === 0}
				>
					Takaisin
				</Button>
			)}
			<Box sx={{ flex: '1 1 auto' }} />
			{ctx.activeStep === 2 ? (
				<LoadingButton onClick={handleNext}>
					Aloita bottaus
				</LoadingButton>
			) : (
				<LoadingButton loading={loading} onClick={handleNext}>
					Seuraava
				</LoadingButton>
			)}
		</Box>
	);
};
