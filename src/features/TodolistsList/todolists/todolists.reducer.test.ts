import { addTodo, changeTodoTitle, removeTodo, TodolistDomainType, todolistsReducer } from './todolists.reducer';

describe('todolistsSlice', () => {
  let initialState: TodolistDomainType[];

  beforeEach(() => {
    initialState = [
      { id: '1', title: 'Todo 1', filter: 'all', entityStatus: 'idle' },
      { id: '2', title: 'Todo 2', filter: 'all', entityStatus: 'idle' },
    ];
  });

  it('add new todo', () => {
    const newTodo = { title: 'New Todo', todoListId: '3' };
    const action = addTodo(newTodo);
    const newState = todolistsReducer(initialState, action);

    expect(newState.length).toBe(3);
    expect(newState[2].title).toBe(newTodo.title);
    expect(newState[2].id).toBe(newTodo.todoListId);
    expect(newState[2].filter).toBe('all');
    expect(newState[2].entityStatus).toBe('idle');
  });

  it('remove todo', () => {
    const action = removeTodo({ id: '1' });
    const newState = todolistsReducer(initialState, action);

    expect(newState.length).toBe(1);
    expect(newState.find((todo: { id: string; }) => todo.id === '1')).toBeUndefined();
  });

  it('update todo title', () => {
    const newTitle = 'Updated Todo 1';
    const action = changeTodoTitle({ id: '1', newTitle });
    const newState = todolistsReducer(initialState, action);

    expect(newState[0].title).toBe(newTitle);
  });
});
