export function getRequestId(inventoryId: string): string {
	const hash = 'c352aecab2c7432d95c1cb08241ed583';
	return btoa(
		[...inventoryId.replace(/-/g, '')]
			.map((char, i) =>
				String.fromCharCode(char.charCodeAt(0) ^ hash.charCodeAt(i))
			)
			.join('')
	).substring(0, 8);
}
