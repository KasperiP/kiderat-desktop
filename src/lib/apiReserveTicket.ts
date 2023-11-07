import { Body, getClient } from '@tauri-apps/api/http';
import { IVariant } from '../interfaces/interfaces';
import { getRequestId } from '../utils/getRequestedId';
import { reverseString } from '../utils/reverseString';

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

	const requestId = getRequestId(variant.inventoryId);

	try {
		const reserveResponse = await client.post(
			'https://api.kide.app/api/reservations',
			body,
			{
				headers: {
					authorization: `Bearer ${reverseString(accessToken)}`,
					'x-requested-Token-28': requestId,
				},
			}
		);

		if (reserveResponse.ok) {
			return true;
		} else {
			return false;
		}
	} catch {
		return false;
	}
};
