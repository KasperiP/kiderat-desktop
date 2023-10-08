import { LoadingButton } from '@mui/lab';
import { Box, Button, Typography } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineClockCircle, AiOutlineSearch } from 'react-icons/ai';
import { IoTicketOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/ContextProvider';
import { IEvent, IVariant } from '../../interfaces/interfaces';
import { apiRefreshEvent } from '../../lib/apiRefreshEvent';
import { apiReserveTicket } from '../../lib/apiReserveTicket';
import { StepContext } from '../../pages/Dashboard';
import { TimeDisplay } from '../TimeDisplay/TimeDisplay';
import { apiRequestedBy } from '../../lib/apiRequestedBy';

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
		tries: number = 0,
		xRequestedId: string
	): Promise<void> => {
		const res = await apiReserveTicket(
			variant,
			authorizationToken,
			amount,
			xRequestedId
		);

		if (variantsGot.includes(variant.id)) return;

		if (res) {
			addLog(`Lippu ${variant.name} onnistui.`);
			setTicketsGot((prev) => prev + amount);
			setVariantsGot((prev) => [...prev, variant.id]);
		} else {
			addLog(
				`Varaus lipulle ${variant.name} epäonnistui. Yritetty ${
					tries + 1
				} kertaa. Yritetään uudelleen...`
			);
			if (tries > 3) {
				addLog(`Lippu ${variant.name} epäonnistui 3 kertaa.`);
				return;
			}

			await new Promise((resolve) =>
				setTimeout(
					resolve,
					globalCtx?.settings.retryTicketReserveDelay || 1000
				)
			);

			const newAmount = Math.ceil(amount / 2);
			if (newAmount < amount) {
				addLog(
					`Yritetään varata ${newAmount} kpl lipun ${variant.name} sijaan...`
				);
			}

			const res = await reserveTicketRecursive(
				variant,
				authorizationToken,
				newAmount,
				tries + 1,
				xRequestedId
			);
			return res;
		}
	};

	const refreshEventRecursive = async (
		event: IEvent,
		tries: number = 0
	): Promise<IEvent | null> => {
		if (tries > 100) {
			addLog('Lippuvaihtoehtojen lataus epäonnistui 100 kertaa.');
			return null;
		}
		const refreshedEvent = await apiRefreshEvent(event);
		if (refreshedEvent?.variants && refreshedEvent.variants.length > 0) {
			globalCtx?.setState((prev) => ({
				...prev,
				event: refreshedEvent,
			}));
			addLog('Lippuvaihtoehtojen lataus onnistui.');
			return refreshedEvent;
		} else {
			addLog(
				`Lippuvaihtoehtojen lataus epäonnistui. Yritetty ${
					tries + 1
				} kertaa. Yritetään uudelleen...`
			);
			await new Promise((resolve) =>
				setTimeout(
					resolve,
					globalCtx?.settings.retryEventRefreshDelay || 1000
				)
			);
			const res = await refreshEventRecursive(event, tries + 1);
			return res;
		}
	};

	const handleUpcomingRecursive = async (event: IEvent): Promise<void> => {
		if (new Date() < new Date(event.product.dateSalesFrom)) {
			await new Promise((resolve) => setTimeout(resolve, 500));
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
		// Returns updated event or null if failed n times
		const refreshedEvent = await refreshEventRecursive(event);

		// If event is null, it means that it failed to refresh n times
		// If we get event we already know that it has variants
		if (!refreshedEvent?.variants) {
			addLog('Bottaus valmiina.');
			setStatus('valmis');
			return;
		}

		addLog('Lippuvaihtoehtoja löytyi. Siirrytään lippujen varaukseen...');

		// Check if any of variant names includes any of the tags
		const tags = globalCtx?.settings.tags;
		if (tags && tags.length > 0) {
			addLog(`Suodatetaan vaihtoehtoja avainsanojen perusteella...`);

			const variantsToReserve = refreshedEvent.variants.filter(
				(variant) =>
					tags.some((tag) =>
						variant.name.toLowerCase().includes(tag.toLowerCase())
					)
			);

			if (variantsToReserve.length === 0) {
				addLog(
					`Yhtään vaihtoehtoa ei löytynyt avainsanojen perusteella. Yritetään varata kaikki vaihtoehdot.`
				);
			} else {
				addLog(
					`Löytyi ${variantsToReserve.length} vaihtoehtoa avainsanojen perusteella.`
				);
				refreshedEvent.variants = variantsToReserve;
			}
		}

		const requestedByIds = await apiRequestedBy(refreshedEvent);
		addLog("Haetaan 'x-requested-id' arvoja Kideratin palvelimelta...");

		if (!requestedByIds) {
			addLog(
				'Lippujen varaamisessa tapahtui virhe. Tämä johtuu Kideratin virheestä. Yritä uudelleen myöhemmin.'
			);
			setStatus('valmis');
			return;
		}

		const promiseArray = [];
		for (const variant of refreshedEvent.variants) {
			if (variantsGot.includes(variant.id)) continue;
			addLog(`Varataan lippuja vaihtoehdolle ${variant.name}...`);

			let maxQuantity: number;
			const availability = variant.availability;
			const maxQuantityPerOrder =
				variant.productVariantMaximumReservableQuantity;
			availability > maxQuantityPerOrder
				? (maxQuantity = maxQuantityPerOrder)
				: (maxQuantity = availability);

			if (maxQuantity === 0) {
				addLog(
					`Lippuja vaihtoehdolle ${variant.name} ei ole enää saatavilla.`
				);
				continue;
			}

			const requestedHeader = requestedByIds.data.find(
				(el) => el.id === variant.inventoryId
			);

			if (!requestedHeader?.['x-requested-id']) {
				addLog(
					`Lippujen varaamisessa tapahtui virhe. Tämä johtuu Kideratin virheestä. Yritä uudelleen myöhemmin.`
				);
				setStatus('valmis');
				return;
			}

			const promise = reserveTicketRecursive(
				variant,
				globalCtx.authorizationToken,
				maxQuantity,
				0,
				requestedHeader['x-requested-id']
			);
			promiseArray.push(promise);
		}
		await Promise.all(promiseArray);
		addLog('Bottaus valmiina.');
		setStatus('valmis');
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
						icon={<SalesStartIcon />}
					/>
					<InfoBox
						title="Tila"
						data={`${status.charAt(0).toUpperCase()}${status.slice(
							1
						)}`}
						icon={<StatusIcon />}
					/>
					<InfoBox
						title="Saatuja lippuja"
						data={ticketsGot}
						icon={<TicketsIcon />}
					/>
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
	icon: React.ReactNode;
}

const InfoBox = ({ title, data, icon }: InfoBoxProps) => {
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
				{icon}
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

const SalesStartIcon = () => {
	return (
		<AiOutlineClockCircle
			size={30}
			color="#5e35b1"
			style={{
				backgroundColor: '#fff',
				borderRadius: '50%',
				padding: '5px',
			}}
		/>
	);
};

const StatusIcon = () => {
	return (
		<AiOutlineSearch
			size={30}
			color="#5e35b1"
			style={{
				backgroundColor: '#fff',
				borderRadius: '50%',
				padding: '5px',
			}}
		/>
	);
};

const TicketsIcon = () => {
	return (
		<IoTicketOutline
			size={30}
			color="#5e35b1"
			style={{
				backgroundColor: '#fff',
				borderRadius: '50%',
				padding: '5px',
			}}
		/>
	);
};
