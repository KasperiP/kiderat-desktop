import { Body, getClient } from '@tauri-apps/api/http';
import { IVariant } from '../interfaces/interfaces';

export const apiReserveTicket = async (
	variant: IVariant,
	accessToken: string,
	quantity: number
): Promise<boolean> => {
	const client = await getClient();

	const inventoryId = variant.inventoryId;
	const body = Body.json({
		toCreate: [
			{
				inventoryId,
				quantity,
				productVariantUserForm: null,
			},
		],
		toCancel: [],
	});

	try {
		const reserveResponse = await client.post(
			'https://api.kide.app/api/reservations',
			body,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if ((reserveResponse.data as any).model) {
			return true;
		} else {
			return false;
		}
	} catch {
		return false;
	}
};
