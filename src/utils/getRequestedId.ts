import { reverseString } from './reverseString';

export function getRequestId(inventoryId: string): string {
	const hash = reverseString(')c_1PMZHlrvG/eb.utuoy//:sptth(][');
	return btoa(
		[...inventoryId.replace(/-/g, '')]
			.map((char, i) =>
				String.fromCharCode(char.charCodeAt(0) ^ hash.charCodeAt(i))
			)
			.join('')
	).substring(0, 8);
}
