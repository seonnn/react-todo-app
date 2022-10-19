import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loginApi, signupApi } from '../../api/apiClient';
import LoginInput from '../../components/Login/LoginInput';
import useForm from '../../hooks/useForm';
import {
	emailValidation,
	passwordValidation,
} from '../../utils/formValidateFunctions';
import { tokenFunctions } from '../../utils/tokenFunctions';

export interface Auth {
	mode: 'login' | 'signup';
}

export interface FormData {
	email: string;
	password: string;
}

const Login = () => {
	const [mode, setMode] = useState<Auth['mode']>('login');
	const [isLoginError, setIsLoginError] = useState(false);
	const [email, isEmailError, handleEmailChange] = useForm(emailValidation);
	const [password, isPasswordError, handlePasswordChange] =
		useForm(passwordValidation);
	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (mode === 'signup') {
			signupApi({ email, password })
				.then((res) => {
					tokenFunctions.setToken(res.data.access_token);
					navigate('/todo');
				})
				.catch(() => {
					window.alert('회원가입에 실패했습니다.');
				});
		} else {
			loginApi({ email, password })
				.then((res) => {
					tokenFunctions.setToken(res.data.access_token);
					navigate('/todo');
				})
				.catch(() => {
					setIsLoginError(true);
				});
		}
	};

	return (
		<Container>
			<h2>{mode === 'login' ? '로그인' : '회원가입'}</h2>
			<LoginForm onSubmit={handleSubmit}>
				<LoginInput
					label="이메일"
					type="email"
					value={email}
					onChange={handleEmailChange}
					isError={mode === 'login' ? false : isEmailError}
					errorMessage={mode === 'login' ? '' : '이메일 형식을 확인해주세요.'}
				/>
				<LoginInput
					label="비밀번호"
					type="password"
					value={password}
					onChange={handlePasswordChange}
					isError={mode === 'login' ? false : isPasswordError}
					errorMessage={
						mode === 'login' ? '' : '비밀번호는 8자 이상 입력해주세요.'
					}
				/>
				<button>{mode === 'login' ? '로그인' : '회원가입'}</button>
				{mode === 'login' && isLoginError && (
					<p>로그인 정보를 다시 확인해주세요</p>
				)}
			</LoginForm>
			<div className="mode-changer">
				{mode === 'login' ? (
					<>
						계정이 없으신가요?{' '}
						<span onClick={() => setMode('signup')}>회원가입</span>
					</>
				) : (
					<>
						이미 가입하셨나요?{' '}
						<span onClick={() => setMode('login')}>로그인</span>
					</>
				)}
			</div>
		</Container>
	);
};

export default Login;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100vh;

	.mode-changer {
		margin-top: 1rem;
		font-size: 14px;
	}

	span {
		color: rgb(51, 102, 255);
		cursor: pointer;
	}
`;

const LoginForm = styled.form`
	border: 1px solid lightgray;
	display: flex;
	flex-direction: column;
	padding: 2rem;
	margin-top: 0.5rem;

	button {
		margin-top: 0.5rem;
	}

	p {
		margin-top: 0.5rem;
		font-size: 12px;
		color: red;
		width: 100%;
		text-align: center;
	}
`;
