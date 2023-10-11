export function getRequestId(inventoryId: string): string {
	const hash = '2ad64e4b26c84fbabba58181de76f7b0';
	return btoa(
		[...inventoryId.replace(/-/g, '')]
			.map((char, i) =>
				String.fromCharCode(char.charCodeAt(0) ^ hash.charCodeAt(i))
			)
			.join('')
	).substring(0, 10);
}
