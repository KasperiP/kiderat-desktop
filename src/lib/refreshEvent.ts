import { ResponseType, getClient } from '@tauri-apps/api/http';
import { IEvent } from '../interfaces/interfaces';

export const refreshEvent = async (event: IEvent): Promise<IEvent | null> => {
	const id = event.product.id;

	const client = await getClient();
	const eventResponse = await client.get<{ model: IEvent }>(
		`https://api.kide.app/api/products/${id}`,
		{
			responseType: ResponseType.JSON,
		}
	);

	if (
		!eventResponse.data.model.variants ||
		eventResponse.data.model.variants.length === 0
	) {
		return null;
	} else {
		return eventResponse.data.model;
	}
};
