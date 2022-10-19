import React, { useState } from 'react';
import { deleteTodosApi, getTodosApi, putTodosApi } from '../../api/apiClient';
import { Todo } from '../../pages/Todo';

export interface Props {
	id: number;
	todo: string;
	isCompleted: boolean;
	setTodoList: React.Dispatch<React.SetStateAction<Todo[] | undefined>>;
}

const TodoComponent = ({ id, todo, isCompleted, setTodoList }: Props) => {
	const [isEdit, setIsEdit] = useState(false);
	const [todoValue, setTodoValue] = useState(todo);

	const deleteTodo = (id: number) => {
		if (window.confirm('정말로 todo 항목을 삭제하시겠습니까?')) {
			deleteTodosApi(id).then(() => {
				getTodosApi().then((res) => setTodoList(res.data));
			});
		}
	};

	const editTodo = () => {
		if (window.confirm('todo 항목을 수정하시겠습니까?')) {
			putTodosApi({ todo: todoValue, isCompleted }, id).then(() => {
				getTodosApi().then((res) => setTodoList(res.data));
			});
		}
		setIsEdit(false);
	};

	return (
		<div className="todo">
			{isEdit ? (
				<input
					value={todoValue}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setTodoValue(e.target.value)
					}
				/>
			) : (
				<p>{todo}</p>
			)}

			<div className="utils">
				{isEdit ? (
					<>
						<span onClick={editTodo}>완료</span>
						<span onClick={() => setIsEdit(false)}>취소</span>
					</>
				) : (
					<>
						<span onClick={() => setIsEdit(true)}>수정</span>
						<span onClick={() => deleteTodo(id)}>삭제</span>
					</>
				)}
			</div>
		</div>
	);
};

export default TodoComponent;
