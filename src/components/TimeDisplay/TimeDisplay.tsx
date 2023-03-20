import { useEffect, useState } from 'react';

export const TimeDisplay = ({ date }: { date?: Date }) => {
	const [dateString, setDateString] = useState('');

	const formatDateStr = (date: Date) => {
		const now = new Date();
		const diff = date.getTime() - now.getTime();
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor(
			(diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);

		let str = '';
		if (days > 0) str += `${days}d `;
		if (hours > 0) str += `${hours}h `;
		if (minutes > 0) str += `${minutes}m `;
		if (seconds > 0) str += `${seconds}s `;
		setDateString(str === '' ? '0s' : str);
	};

	// Countdown to sales start
	useEffect(() => {
		if (!date) return;
		if (date.getTime() <= new Date().getTime()) {
			setDateString('Alkanut');
			return;
		}

		formatDateStr(date);
		const interval = setInterval(() => {
			if (date.getTime() <= new Date().getTime()) {
				setDateString('Alkanut');
				clearInterval(interval);
				return;
			}
			formatDateStr(date);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return <>{dateString}</>;
};
