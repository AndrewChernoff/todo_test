import React from "react";
import { Task } from "./Task/Task";
import { TodolistDomainType } from "features/TodolistsList/todolists/todolists.reducer";
import { TaskType } from "features/TodolistsList/tasks/tasks.reducer";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Tasks = ({ todolist, tasks }: Props) => {
  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.completed === true);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.completed === false);
  }  

  return (
    <div>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={todolist.id} />
      ))}
    </div>
  );
};
