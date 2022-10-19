import { type } from 'os';
import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	type: 'email' | 'password';
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isError: boolean;
	errorMessage?: string;
}

const LoginInput = ({
	label,
	type,
	name,
	value,
	onChange,
	isError,
	errorMessage,
}: Props) => {
	return (
		<InputContainer>
			<label>{label}</label>
			<Input type={type} name={name} value={value} onChange={onChange} />
			<p>{isError && errorMessage}</p>
		</InputContainer>
	);
};

export default LoginInput;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;

	p {
		font-size: 12px;
		color: red;
	}
`;

const Input = styled.input``;
