import React, { ChangeEvent, memo, useCallback } from 'react'
import { Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { EditableSpan } from 'common/components'
import { changeStatusTask, removeTask, TaskType, updateTask } from 'features/TodolistsList/tasks/tasks.reducer';
import { useAppDispatch } from 'common/hooks';

type TaskPropsType = {
	task: TaskType
	todoListId: string
}

export const Task = memo(({task, todoListId}: TaskPropsType) => {
	const dispatch = useAppDispatch()

	const onClickHandler = useCallback(() => {
		dispatch(removeTask({taskId: task.id, todoListId:todoListId}))
	}, [dispatch, task.id, todoListId]);

	const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		dispatch(changeStatusTask({taskId: task.id, completed: newIsDoneValue, todoListId}))
	}, [dispatch, task.id, todoListId]);

	const onTitleChangeHandler = useCallback((newValue: string) => {
		dispatch(updateTask({taskId: task.id, newTitle: newValue, todoListId}))
	}, [dispatch, task.id, todoListId]);

	return <div key={task.id} /* className={task.status === TaskStatuses.Completed ? 'is-done' : ''} */>
		<Checkbox
			checked={task.completed}
			color="primary"
			onChange={onChangeStatusHandler}
		/>

		<EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
		<IconButton onClick={onClickHandler}>
			<Delete/>
		</IconButton>
	</div>
})
