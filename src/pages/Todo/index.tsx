import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getTodosApi, postTodosApi } from '../../api/apiClient';
import TodoComponent from '../../components/Todo/TodoComponent';

export interface Todo {
	id: number;
	todo: string;
	isCompleted: boolean;
	userId: number;
}

const Todo = () => {
	const [todoList, setTodoList] = useState<Todo[]>();
	const [todoValue, setTodoValue] = useState('');

	const [editedValue, setEditedValue] = useState('');

	useEffect(() => {
		getTodosApi().then((res) => {
			console.log(res);
			setTodoList(res.data);
		});
	}, []);

	const handleTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (todoValue.trim().length < 1) {
			window.alert('해야할 일이 입력되지 않았습니다.');
			return;
		}

		postTodosApi({ todo: todoValue }).then(() => {
			getTodosApi().then((res) => setTodoList(res.data));
		});
		setTodoValue('');
	};

	return (
		<Container>
			<h2>Todo List</h2>
			<TodoContainer>
				<TodoList>
					{todoList && todoList.length > 0 ? (
						todoList.map((el: Todo) => (
							<TodoComponent
								key={el.id}
								id={el.id}
								todo={el.todo}
								isCompleted={el.isCompleted}
								setTodoList={setTodoList}
							/>
						))
					) : (
						<div>작성된 TODO LIST가 없습니다.</div>
					)}
				</TodoList>
				<TodoForm onSubmit={handleTodoSubmit}>
					<input
						value={todoValue}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setTodoValue(e.target.value)
						}
					/>
					<button>입력</button>
				</TodoForm>
			</TodoContainer>
		</Container>
	);
};

export default Todo;

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	h2 {
		margin-bottom: 1rem;
	}
`;

const TodoContainer = styled.div`
	border: 1px solid lightgray;
	width: 500px;
	height: 700px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	padding: 2rem;
`;

const TodoList = styled.div`
	width: 100%;

	.todo {
		display: flex;
		justify-content: space-between;
	}

	.utils {
		display: inline-block;
	}

	& span {
		margin-left: 0.5rem;
		cursor: pointer;
	}
`;

const TodoForm = styled.form`
	display: flex;
	justify-content: space-between;
`;
