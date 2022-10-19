import axios, { AxiosRequestHeaders } from 'axios';
import { FormData } from '../pages/Login';
import { Todo } from '../pages/Todo';
import { tokenFunctions } from '../utils/tokenFunctions';

const apiClient = axios.create({
	baseURL: 'https://pre-onboarding-selection-task.shop/',
});

export const headers = {
	Authorization: `Bearer ${tokenFunctions.getToken()}`,
};

export const signupApi = async (data: FormData) => {
	try {
		return await apiClient.post('/auth/signup', data);
	} catch (error) {
		throw new Error('회원가입 실패');
	}
};

export const loginApi = async (data: FormData) => {
	try {
		return await apiClient.post('/auth/signin', data);
	} catch (error) {
		throw new Error('로그인 실패');
	}
};

export const getTodosApi = async () => {
	try {
		return await apiClient.get('/todos', {
			headers,
		});
	} catch (error) {
		throw new Error('Todo 데이터 로드 실패');
	}
};

export const postTodosApi = async (data: { todo: string }) => {
	try {
		return await apiClient.post('/todos', data, {
			headers,
		});
	} catch (error) {
		throw new Error('Todo 입력 실패');
	}
};

export const deleteTodosApi = async (id: number) => {
	try {
		return await apiClient.delete(`/todos/${id}`, {
			headers,
		});
	} catch (error) {
		throw new Error('Todo 입력 실패');
	}
};

export const putTodosApi = async (
	data: { todo: string; isCompleted: boolean },
	id: number
) => {
	try {
		return await apiClient.put(`/todos/${id}`, data, {
			headers,
		});
	} catch (error) {
		throw new Error('Todo 수정 실패');
	}
};
