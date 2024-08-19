import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskPriorities, TaskStatuses } from 'common/enums';
import { v4 } from 'uuid';
import { addTodo } from '../todolists/todolists.reducer';


const initialState: TasksStateType = {}

const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<{todoListId: string, title: string}>) => {
			const newTask = {id: v4(), todoListId: action.payload.todoListId, title: action.payload.title, completed: false}
			
			state[action.payload.todoListId].push(newTask as any)			
		},
		updateTask: (state, action: PayloadAction<{todolistId: string, newTitle: string, taskId: string}>) => {
			const tasks = state[action.payload.todolistId]
			const foundTask = tasks.find(el => el.id === action.payload.taskId)
			if (foundTask) {
				foundTask.title = action.payload.newTitle
			}
		},
		removeTask: (state, action: PayloadAction<{todolistId: string, taskId: string}>) => {
			const tasks = state[action.payload.todolistId]
				const index = tasks.findIndex(t => t.id === action.payload.taskId)
				if (index !== -1) tasks.splice(index, 1)
		},
		changeStatusTask: (state, action: PayloadAction<{todolistId: string, taskId: string, completed: boolean}>) => {
			const tasks = state[action.payload.todolistId]

			const task = tasks.find(el => el.id === action.payload.taskId)
			if(task) {
				task.completed = action.payload.completed
			}
			
		},
	},
	extraReducers: builder => {
		builder
			.addCase(addTodo, (state, action) => {
				state[action.payload.todoListId] = []
			})
	}
})


export const { addTask, updateTask, removeTask, changeStatusTask } = slice.actions

export const tasksReducer = slice.reducer


// types
export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

export type TaskType = {
	title: string
	completed: boolean
	id: string
	todoListId: string
}