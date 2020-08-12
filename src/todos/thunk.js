import { loadTodosFailure, loadTodosInProgress, loadTodosSuccess, createTodo, removeTodo, markTodoAsCompleted} from './actions';

export const displayAlert = (text) => () => {
    alert(text);
};

export const loadTodo = () => async (dispatch, getState) => {
    try {
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos-delay')
        const todos = await response.json();

        dispatch(loadTodosSuccess(todos));
    } catch (error) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert('qwertyui'));
    }
    
}

export const addTodoRequest = text => async dispatch => {
    try {
        const body = JSON.stringify({text});
        const response  = await fetch('http://localhost:8080/todos',{
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body
        });
        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch (error) {
        dispatch(displayAlert('qwertyuio'));
    }
}

export const deleteTodoRequest = id => async dispatch => {
    try {
        const response  = await fetch(`http://localhost:8080/todos/${id}`, {
            method:'delete'
        });
        const removeTodos = await response.json();
        dispatch(removeTodo(removeTodos));
    } catch (error) {
        dispatch(displayAlert('qwertyuio'));
    }
}

export const completeTodoRequest = id => async dispatch => {
    try {
        const response  = await fetch(`http://localhost:8080/todos/${id}/completed`,{
            method: 'POST'
        });
        const completedTodo = await response.json();
        debugger;
        dispatch(markTodoAsCompleted(completedTodo));
    } catch (error) {
        dispatch(displayAlert('qwertyuio'));
    }
}