import React from 'react'
import {
	AppBar,
	Container,
	Toolbar
} from '@mui/material';
import { TodolistsList } from 'features/TodolistsList/TodolistsList'
import './App.css'

function App() {
	

	return (
			<div className="App">
				<AppBar position="static">
					<Toolbar>
						Todo List
					</Toolbar>
				</AppBar>
				<Container fixed>
					<TodolistsList/>
				</Container>
			</div>
	)
}

export default App
