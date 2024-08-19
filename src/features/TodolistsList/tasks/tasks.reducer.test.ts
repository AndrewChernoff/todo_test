import { addTask, changeStatusTask, removeTask, tasksReducer, TasksStateType, updateTask } from './tasks.reducer';

describe('tasksSlice', () => {
  let initialState: TasksStateType;

  beforeEach(() => {
    initialState = {
      'todolist-1': [],
      'todolist-2': [{
        id: 'taskId2',
        todoListId: 'todolist-2',
        title: 'yo',
        completed: false
      }],
    };
  });

  it('should add a task to the correct todo list', () => {
    const newTaskTitle = 'New Task';
    const todoListId = 'todolist-1';

    const action = addTask({ todoListId, title: newTaskTitle });
    const newState = tasksReducer(initialState, action);

    expect(newState[todoListId].length).toBe(1);
    expect(newState[todoListId][0].title).toBe(newTaskTitle);
    expect(newState[todoListId][0].completed).toBe(false);
    expect(newState[todoListId][0].todoListId).toBe(todoListId);
  });

  it('update task title', () => {
    const newTaskTitle = 'New Task 2';
    const todoListId = 'todolist-2';

    const action = updateTask({todoListId, newTitle: newTaskTitle, taskId: 'taskId2' })
    const newState = tasksReducer(initialState, action)

    expect(newState[todoListId][0].title).toBe('New Task 2')
    
    });
  it('remove task', () => {
    const todoListId = 'todolist-2';

    const action = removeTask({todoListId, taskId: 'taskId2' })
    const newState = tasksReducer(initialState, action)

    expect(newState[todoListId].length).toEqual(0)
    
    });

  it('change task status', () => {
    const todoListId = 'todolist-2';

    const action = changeStatusTask({todoListId, taskId: 'taskId2', completed: true })
    const newState = tasksReducer(initialState, action)

    expect(newState[todoListId][0].completed).toBe(true)
    
    });
});