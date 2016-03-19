import * as actions from './TodoActions';
import * as types from '../constants/ActionTypes';

describe('TodoActions', () => {
  it('creates ADD_TODO action', () => {
    expect(actions.addTodo('Use Redux')).toEqual({
      type: types.ADD_TODO,
      text: 'Use Redux'
    });
  });

  it('creates CLEAR_COMPLETED action', () => {
    expect(actions.clearCompleted()).toEqual({
      type: types.CLEAR_COMPLETED
    });
  });

  it('creates COMPLETE_ALL action', () => {
    expect(actions.completeAll()).toEqual({
      type: types.COMPLETE_ALL
    });
  });

  it('creates COMPLETE_TODO action', () => {
    expect(actions.completeTodo(1)).toEqual({
      type: types.COMPLETE_TODO,
      id: 1
    });
  });

  it('creates DELETE_TODO action', () => {
    expect(actions.deleteTodo(1)).toEqual({
      type: types.DELETE_TODO,
      id: 1
    });
  });

  it('creates EDIT_TODO action', () => {
    expect(actions.editTodo(1, 'Use Redux everywhere')).toEqual({
      type: types.EDIT_TODO,
      id: 1,
      text: 'Use Redux everywhere'
    });
  });

  it('creates FETCH_TODOS_FAIL action', () => {
    expect(actions.fetchTodosFail('Internal server error')).toEqual({
      type: types.FETCH_TODOS_FAIL,
      error: 'Internal server error'
    });
  });

  it('creates FETCH_TODOS_REQUEST action', () => {
    expect(actions.fetchTodosRequest()).toEqual({
      type: types.FETCH_TODOS_REQUEST
    });
  });

  it('creates FETCH_TODOS_SUCCESS action', () => {
    expect(actions.fetchTodosSuccess(['item'])).toEqual({
      type: types.FETCH_TODOS_SUCCESS,
      todos: ['item']
    });
  });
});
