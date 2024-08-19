import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { addTodo, changeTodoTitle, removeTodo } from "features/TodolistsList/todolists/todolists.reducer";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";
import { Todolist } from "./Todolist/Todolist";
import { useAppDispatch } from "common/hooks";
import { selectTasks } from "features/TodolistsList/tasks/tasks.selectors";
import { selectTodolists } from "features/TodolistsList/todolists/todolists.selectors";
import { v4 } from 'uuid';



export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  //const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch()


  const removeTodolist = useCallback(function (id: string) {
    return dispatch(removeTodo({id}))
  }, [dispatch]);

  const changeTodolistTitle = useCallback(function (id: string, newTitle: string) {
    return dispatch(changeTodoTitle({id, newTitle}))
  }, [dispatch]);

  const addTodolistCallback = useCallback((title: string) => {    
    return dispatch(addTodo({ title, todoListId: v4() }));

  }, [dispatch]);


  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolistCallback} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTodolist={removeTodolist}
                  changeTodolistTitle={changeTodolistTitle}
                  key={tl.id}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
