export const tokenFunctions = {
	setToken: (value: string) => localStorage.setItem('access_token', value),
	getToken: () => localStorage.getItem('access_token'),
	deleteToken: () => localStorage.removeItem('access_token'),
};
