export const reverseString = (string: string): string => {
	return Array.from(string).reduce((a, e) => e + a);
};
