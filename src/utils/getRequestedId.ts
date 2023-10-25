export function getRequestId(inventoryId: string): string {
	const hash = '3a7ceab52edd4b7ba69e3e120be4793f';
	return btoa(
		[...inventoryId.replace(/-/g, '')]
			.map((char, i) =>
				String.fromCharCode(char.charCodeAt(0) ^ hash.charCodeAt(i))
			)
			.join('')
	).substring(0, 8);
}
