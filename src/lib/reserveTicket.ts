import { Body, getClient } from '@tauri-apps/api/http';
import { IVariant } from '../interfaces/interfaces';

export const reserveTickets = async (
	variant: IVariant,
	accessToken: string,
	quantity: number
): Promise<boolean> => {
	const client = await getClient();

	let maxQuantity: number;
	const availability = variant.availability;
	const maxQuantityPerOrder = variant.productVariantMaximumReservableQuantity;
	availability > maxQuantityPerOrder
		? (maxQuantity = maxQuantityPerOrder)
		: (maxQuantity = availability);

	if (maxQuantity > quantity) maxQuantity = quantity;

	if (maxQuantity === 0) return false;

	const inventoryId = variant.inventoryId;
	const body = Body.json({
		toCreate: [
			{
				inventoryId,
				quantity: maxQuantity,
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
