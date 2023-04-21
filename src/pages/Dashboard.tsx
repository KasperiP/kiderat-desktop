import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { createContext, useState } from 'react';
import { Bot } from '../components/Dashboard/Bot';
import { Delay } from '../components/Dashboard/Delay';
import { Event } from '../components/Dashboard/Event';
import { Summary } from '../components/Dashboard/Summary';
import { Tags } from '../components/Dashboard/Tags';

const steps = ['Tapahtuma', 'Viive', 'Avainsanat', 'Yhteenveto', 'Bottaus'];

export const StepContext = createContext<{
	activeStep: number;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}>({
	activeStep: 0,
	setActiveStep: () => {},
});

export const Dashboard = () => {
	const [activeStep, setActiveStep] = useState(0);

	return (
		<StepContext.Provider value={{ activeStep, setActiveStep }}>
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
					zIndex: -1,
				}}
			></div>
			<Box
				sx={{
					width: '100%',
					height: 'calc(100vh - 32px)',
					padding: '40px',
					flexDirection: 'column',
					display: 'flex',
					justifyContent: 'space-between',
					zIndex: 999,
					position: 'relative',
				}}
			>
				<Stepper activeStep={activeStep} sx={{ mb: 3 }}>
					{steps.map((label, index) => {
						const stepProps: { completed?: boolean } = {};
						const labelProps: {
							optional?: React.ReactNode;
						} = {};

						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				{activeStep === 0 && <Event />}
				{activeStep === 1 && <Delay />}
				{activeStep === 2 && <Tags />}
				{activeStep === 3 && <Summary />}
				{activeStep === 4 && <Bot />}
			</Box>
		</StepContext.Provider>
	);
};
