import React, { memo, useCallback, useEffect } from 'react'
import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { TodolistDomainType } from 'features/TodolistsList/todolists/todolists.reducer'
import { useAppDispatch } from 'common/hooks';
import { AddItemForm, EditableSpan } from 'common/components'
import { FilterButtons } from './FilterButtons'
import { Tasks } from './Tasks/Tasks'
import { addTask, TaskType } from '../tasks/tasks.reducer';

type PropsType = {
	todolist: TodolistDomainType
	tasks: TaskType[]
	removeTodolist: (id: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = memo(function ({todolist, removeTodolist, changeTodolistTitle, tasks}: PropsType) {
	const dispatch = useAppDispatch() 
	

	const addTaskCallback = useCallback((title: string) => {
		return dispatch(addTask({title, todoListId: todolist.id}))
	}, [dispatch, todolist.id])

	const removeTodolistCallback = () => {
		removeTodolist(todolist.id)
	}

	const changeTodolistTitleCallback = useCallback((newTitle: string) => {
		changeTodolistTitle(todolist.id, newTitle)
	}, [todolist.id, changeTodolistTitle])


	return <div>
		<h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback}/>
			<IconButton onClick={removeTodolistCallback} disabled={todolist.entityStatus === 'loading'}>
				<Delete/>
			</IconButton>
		</h3>
		<AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
		<div>
			<Tasks tasks={tasks} todolist={todolist} />
		</div>
		{tasks.length > 0 && <div style={{paddingTop: '10px'}}>
			<FilterButtons todolist={todolist}/>
		</div>}
	</div>
})


