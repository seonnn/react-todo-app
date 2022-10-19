const emailValidation = (email: string) => {
	const emailRegex =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

	return !emailRegex.test(email);
};

const passwordValidation = (password: string) => {
	return password.length < 8;
};

export { emailValidation, passwordValidation };
