export function getRequestId(inventoryId: string): string {
	const hash = '88eb018255764f4689066d434704ee4c';
	return btoa(
		[...inventoryId.replace(/-/g, '')]
			.map((char, i) =>
				String.fromCharCode(char.charCodeAt(0) ^ hash.charCodeAt(i))
			)
			.join('')
	).substring(0, 8);
}
