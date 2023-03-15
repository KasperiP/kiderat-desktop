import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: {
			light: '#757ce8',
			main: '#5e35b1',
			dark: '#5230a1',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		},
	},
});
