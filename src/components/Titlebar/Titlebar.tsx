import { Box, Typography } from '@mui/material';
import { appWindow } from '@tauri-apps/api/window';
import { ReactNode } from 'react';
import {
	VscChromeClose,
	VscChromeMaximize,
	VscChromeMinimize,
} from 'react-icons/vsc';

interface ManageButtonProps {
	onClick: () => void;
	children: ReactNode;
}

const ManageButton = (props: ManageButtonProps) => {
	return (
		<Box
			sx={{
				display: 'inline-flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: 32,
				height: 32,
				':hover': {
					backgroundColor: '#54309f',
				},
				':last-child:hover': {
					backgroundColor: '#f23f42',
					borderRadius: '0 10px 0 0',
				},
			}}
			onClick={props.onClick}
		>
			{props.children}
		</Box>
	);
};

export const Titlebar = () => {
	return (
		<Box
			data-tauri-drag-region
			sx={{
				height: 32,
				background: '#5e35b1',
				'-webkit-user-select': 'none',
				userSelect: 'none',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				paddingLeft: '15px',
				zIndex: 999,
			}}
		>
			<Box sx={{ display: 'flex' }}>
				<img
					src="/kiderat_logo.svg"
					alt="menu"
					width={20}
					height={20}
					draggable={false}
					style={{
						filter: 'invert(1)',
					}}
				/>
			</Box>
			<Box>
				<Typography
					variant="h2"
					fontSize={16}
					fontWeight={500}
					color={'white'}
				>
					Kide.rat
				</Typography>
			</Box>
			<Box>
				<ManageButton onClick={() => appWindow.minimize()}>
					<VscChromeMinimize color="#fff" />
				</ManageButton>
				<ManageButton onClick={() => appWindow.maximize()}>
					<VscChromeMaximize color="#fff" />
				</ManageButton>
				<ManageButton onClick={() => appWindow.close()}>
					<VscChromeClose color="#fff" />
				</ManageButton>
			</Box>
		</Box>
	);
};
