import { useEffect, useState } from 'react';

export const TimeDisplay = ({ date }: { date?: Date }) => {
	const [time, setTime] = useState(date);
	const [dateString, setDateString] = useState('');

	if (date && date.getTime() < new Date().getTime()) {
		return <>Alkanut</>;
	}

	// Countdown to sales start
	useEffect(() => {
		if (!time) return;
		const interval = setInterval(() => {
			const now = new Date();
			const diff = time.getTime() - now.getTime();
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
			setDateString(str);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return <>{dateString}</>;
};
