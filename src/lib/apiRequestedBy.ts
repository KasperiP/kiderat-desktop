import { Body, ResponseType, getClient } from '@tauri-apps/api/http';
import { IEvent } from '../interfaces/interfaces';

interface IEventResponse {
	data: {
		id: string;
		'x-requested-id': string;
	}[];
}

/**
 * Annetaan muillekin mahdollisuus kikkailla ratkaisu request-id:n saamiseksi,
 * joten varsinainen koodi ajetaan kideratin palvelimella :) Sori siitä, jos sitä
 * tulit tänne katsomaan.
 */
export const apiRequestedBy = async (
	event: IEvent
): Promise<IEventResponse | null> => {
	const client = await getClient();
	const body = Body.json({
		model: event,
	});

	try {
		const eventResponse = await client.post<{
			data: {
				id: string;
				'x-requested-id': string;
			}[];
		}>(`https://kiderat.app/api/requestId`, body);

		return eventResponse.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
