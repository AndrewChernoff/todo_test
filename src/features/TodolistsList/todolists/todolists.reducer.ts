import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodolistType } from 'features/TodolistsList/todolists/todolists.api';

const initialState: TodolistDomainType[] = []

const slice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
			const todo = state.find(todo => todo.id === action.payload.id)
			if (todo) {
				todo.filter = action.payload.filter
			}
		},
		changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {///?
			const todo = state.find(todo => todo.id === action.payload.id)
			if (todo) {
				todo.entityStatus = action.payload.entityStatus
			}
		},
		addTodo: (state, action: PayloadAction<{title: string, todoListId: string}>) => {
			const newTodo = {entityStatus: "idle" as RequestStatusType, filter: "all" as FilterValuesType, id: action.payload.todoListId, title: action.payload.title}
			
			state.push(newTodo)			
		},
		removeTodo: (state, action: PayloadAction<{id: string}>) => {			
			return state.filter(el => el.id !== action.payload.id)	
		},
		changeTodoTitle: (state, action: PayloadAction<{id: string, newTitle: string}>) => {	
			
			const foundTodo = state.find(el => el.id === action.payload.id)

			if(foundTodo) {
				foundTodo.title = action.payload.newTitle
			}
			
		},
	},
})

export const { addTodo, removeTodo, changeTodoTitle } = slice.actions
export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions


// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
	entityStatus: RequestStatusType
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'