import React, { useCallback, useState } from 'react';

const useForm = (
	validateFunction: (value: string) => boolean
): [string, boolean, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
	const [value, setValue] = useState('');
	const [isError, setIsError] = useState(false);

	const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		setIsError(validateFunction(event.target.value));
	};

	return [value, isError, handleValueChange];
};

export default useForm;
