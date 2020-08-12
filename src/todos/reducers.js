import { CREATE_TODO, REMOVE_TODO, MARK_TODO_AS_COMPLETED, 
    LOAD_TODOS_IN_PROGRESS, LOAD_TODOS_IN_FAILURE, LOAD_TODOS_IN_SUCCESS } from './actions';

// export const isLoading = (state= false, action) => {
//     const {type} = action;

//     switch(type) {
//         case LOAD_TODOS_IN_PROGRESS:
//             return true;
        
//         case LOAD_TODOS_IN_SUCCESS:
//             return false;
//         case LOAD_TODOS_IN_FAILURE:
//             return false;
//         default: 
//             return state;
//     }
// }

const initialState = {isLoading: false, data : []};

export const todos = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
    case CREATE_TODO: {
        const { todo } = payload;
        return {
            ...state,
            data: state.data.concat(todo),
        }
    }
    case REMOVE_TODO: {
        console.log('payload=====>', payload);
        const { todo: todoToRemove } = payload;
        return {
            ...state,
            data: state.data.filter(todo => todo.id !== todoToRemove.id),
        }
    }
    case MARK_TODO_AS_COMPLETED: {
        const { todo: completedTodo } = payload;
        return {...state,
            data: state.data.map(todo => {
            if (todo.id === completedTodo.id) {
                return { ...todo, isCompleted: true };
            }
            return todo;
        })
    };
    }

    case LOAD_TODOS_IN_SUCCESS: {
        const {todos} = payload;
        return {...state, 
            isLoading: false,
            data: todos,
        };
    }

    case LOAD_TODOS_IN_FAILURE: {
        return {
            ...state,
            isLoading: false,
        }
    }
    case LOAD_TODOS_IN_PROGRESS: {
        return {
            ...state,
            isLoading: true,
        }
    }

    default:
        return state;
    }
}