import { reverseString } from './reverseString';

export function getRequestId(inventoryId: string): string {
	const hash = reverseString(')Uuv4RGDq225/eb.utuoy//:sptth(][');
	return btoa(
		[...inventoryId.replace(/-/g, '')]
			.map((char, i) =>
				String.fromCharCode(char.charCodeAt(0) ^ hash.charCodeAt(i))
			)
			.join('')
	).substring(0, 8);
}
