import React from 'react'
import {
	AppBar,
	Container,
	IconButton,
	Toolbar,
	Typography
} from '@mui/material';
import { Menu } from '@mui/icons-material'
import { TodolistsList } from 'features/TodolistsList/TodolistsList'
import './App.css'

function App() {
	

	return (
			<div className="App">
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" color="inherit" aria-label="menu">
							<Menu/>
						</IconButton>
						<Typography variant="h6">
							News
						</Typography>
					</Toolbar>
				</AppBar>
				<Container fixed>
					<TodolistsList/>
				</Container>
			</div>
	)
}

export default App
