import { LoadingButton } from '@mui/lab';
import { Box, Button, Typography } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/ContextProvider';
import { IEvent, IVariant } from '../../interfaces/interfaces';
import { apiRefreshEvent } from '../../lib/apiRefreshEvent';
import { apiReserveTicket } from '../../lib/apiReserveTicket';
import { StepContext } from '../../pages/Dashboard';
import { TimeDisplay } from '../TimeDisplay/TimeDisplay';

export const Bot = () => {
	const [logs, setLogs] = useState<string[]>([]);
	const [variantsGot, setVariantsGot] = useState<string[]>([]);
	const [status, setStatus] = useState<'odottaa' | 'käynnissä' | 'valmis'>(
		'odottaa'
	);
	const [ticketsGot, setTicketsGot] = useState<number>(0);

	const navigate = useNavigate();

	const globalCtx = useContext(GlobalContext);
	const stepCtx = useContext(StepContext);

	const messagesEndRef = useRef(null);
	const hasRunned = useRef(false);

	const event = globalCtx?.event;

	const scrollToBottom = () => {
		(messagesEndRef.current as any)?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [logs]);

	useEffect(() => {
		if (!hasRunned.current) {
			addLog('Odotetaan käynnistystä...');
		}
		return () => {
			hasRunned.current = true;
		};
	}, []);

	const reserveTicketRecursive = async (
		variant: IVariant,
		authorizationToken: string,
		amount: number,
		tries: number = 0
	): Promise<void> => {
		const res = await apiReserveTicket(variant, authorizationToken, amount);

		if (variantsGot.includes(variant.id)) return;

		if (res) {
			addLog(`Lippu ${variant.name} onnistui.`);
			setTicketsGot((prev) => prev + amount);
			setVariantsGot((prev) => [...prev, variant.id]);
		} else {
			const id = variant.id;
			addLog(
				`Varaus lipulle ${variant.name} epäonnistui. Yritetty ${tries} kertaa. Yritetään uudelleen...`
			);
			if (tries > 3) {
				addLog(`Lippu ${variant.name} epäonnistui 3 kertaa.`);
				return;
			}

			await new Promise((resolve) => setTimeout(resolve, 5000));
			const res = await reserveTicketRecursive(
				variant,
				authorizationToken,
				amount,
				tries + 1
			);
			return res;
		}
	};

	const refreshEventRecursive = async (
		event: IEvent,
		tries: number = 0
	): Promise<void> => {
		if (tries > 50) {
			addLog('Lippuvaihtoehtojen lataus epäonnistui 50 kertaa.');
			return;
		}
		const refreshedEvent = await apiRefreshEvent(event);
		if (refreshedEvent) {
			globalCtx?.setState((prev) => ({
				...prev,
				event: refreshedEvent,
			}));
			addLog('Lippuvaihtoehtojen lataus onnistui.');
		} else {
			addLog(
				`Lippuvaihtoehtojen lataus epäonnistui. Yritetty ${tries} kertaa. Yritetään uudelleen...`
			);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			const res = await refreshEventRecursive(event, tries + 1);
			return res;
		}
	};

	const handleUpcomingRecursive = async (event: IEvent): Promise<void> => {
		if (new Date() < new Date(event.product.dateSalesFrom)) {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			const res = await handleUpcomingRecursive(event);
			return res;
		} else {
			addLog('Lipunmyynti on alkanut. Jatketaan lippuvaihtoehtoihin...');
		}
	};

	const handleBotting = async () => {
		setStatus('käynnissä');
		if (!event || !globalCtx.authorizationToken) return;

		if (new Date() < new Date(event.product.dateSalesFrom)) {
			addLog(
				'Lipunmyynti ei ole vielä alkanut. Odotetaan myynnin alkua...'
			);
			await handleUpcomingRecursive(event);
		}

		if (!event?.variants || event.variants.length === 0) {
			addLog('Lippuvaihtoehtoja ei löytynyt. Ladataan uudelleen...');
		} else {
			addLog('Päivitetään lippuvaihtoehtojen tiedot...');
		}
		await refreshEventRecursive(event);

		if (event?.variants && event.variants.length > 0) {
			addLog(
				'Lippuvaihtoehtoja löytyi. Siirrytään lippujen varaukseen...'
			);
			const promiseArray = [];
			for (const variant of event.variants) {
				if (variantsGot.includes(variant.id)) continue;
				addLog(`Varataan lippuja vaihtoehdolle ${variant.name}...`);

				let maxQuantity: number;
				const availability = variant.availability;
				const maxQuantityPerOrder =
					variant.productVariantMaximumReservableQuantity;
				availability > maxQuantityPerOrder
					? (maxQuantity = maxQuantityPerOrder)
					: (maxQuantity = availability);

				const promise = reserveTicketRecursive(
					variant,
					globalCtx.authorizationToken,
					maxQuantity,
					0
				);
				promiseArray.push(promise);
			}
			await Promise.all(promiseArray);
			addLog('Bottaus valmiina.');
			setStatus('valmis');
		}
	};

	const handleBack = () => {
		stepCtx?.setActiveStep((prev) => prev - 1);
	};

	const addLog = (log: string) => {
		const date = new Date();
		const dateStr = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
		setLogs((prev) => [...prev, `${dateStr} ${log}`]);
	};

	return (
		<>
			<Box
				sx={{
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '1rem',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: 400,
						justifyContent: 'space-between',
						height: '100%',
					}}
				>
					<InfoBox
						title="Myynnin alkuun"
						data={
							<TimeDisplay
								date={
									new Date(
										globalCtx?.event?.product
											.dateSalesFrom as any
									)
								}
							/>
						}
					/>
					<InfoBox
						title="Tila"
						data={`${status.charAt(0).toUpperCase()}${status.slice(
							1
						)}`}
					/>
					<InfoBox title="Saatuja lippuja" data={ticketsGot} />
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						background: 'white',
						border: '1px solid #e0e0e0',
						width: '100%',
						height: '100%',
						overflowY: 'auto',
						maxHeight: 388,
						padding: '1rem',
						borderRadius: '0.5rem',
					}}
				>
					{logs.map((log, i) => (
						<Typography fontSize={15} key={i}>
							{log}
						</Typography>
					))}
					<div
						style={{ float: 'left', clear: 'both' }}
						ref={messagesEndRef}
					></div>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
				<Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
					Takaisin
				</Button>
				<Box sx={{ flex: '1 1 auto' }} />
				{status === 'odottaa' ? (
					<LoadingButton onClick={handleBotting}>
						Aloita bottaus
					</LoadingButton>
				) : (
					<LoadingButton onClick={() => navigate('/')} color="error">
						Lopeta
					</LoadingButton>
				)}
			</Box>
		</>
	);
};

interface InfoBoxProps {
	title: string;
	data: string | React.ReactNode;
}

const InfoBox = ({ title, data }: InfoBoxProps) => {
	return (
		<Box
			sx={{
				background: '#5e35b1',
				borderRadius: '0.5rem',
				height: 110,
				padding: '10px',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: '10px',
				}}
			>
				<HiOutlineStatusOnline
					size={30}
					color="#5e35b1"
					style={{
						backgroundColor: '#fff',
						borderRadius: '50%',
						padding: '5px',
					}}
				/>
				<Typography
					variant="h6"
					fontWeight={500}
					color="#fff"
					fontSize={18}
				>
					{title}
				</Typography>
			</Box>
			<Typography
				mt={1}
				variant="h6"
				fontWeight={500}
				color="#efefef"
				fontSize={18}
			>
				{data}
			</Typography>
		</Box>
	);
};
