const initialState = {
    todos: [],
    text: "",
    status: "all",
};

let id = 1;

const todos = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case 'CHANGE':
            newState = { text: action.payload.text };
            return {...state, ...newState};
        case 'SUBMIT':
            const todo = { text: state.text, key: `${id++}`, checked: false, status: "active" };
            newState = {
                todos: [...state.todos, ...[todo]],
                text: "",
            };

            return {...state, ...newState};
        case 'REMOVE':
            newState = {
                todos: [...state.todos],
            };

            for(let i = 0; i < newState.todos.length; i++) {
                if (newState.todos[i].key === action.payload.key) {
                    newState.todos.splice(i, 1);
                    break;
                }
            }

            return {...state, ...newState};
        case 'CHECK':
            newState = {
                todos: [...state.todos],
            };

            for(let i = 0; i < newState.todos.length; i++) {
                if (newState.todos[i].key === action.payload.key) {
                    const checked = !newState.todos[i].checked;
                    newState.todos[i].checked = checked;
                    newState.todos[i].status = checked ? "completed" : "active";
                    break;
                }
            }

            return {...state, ...newState};
        case 'CHANGE_STATUS':
            newState = {
                status: action.payload.status,
            };

            return {...state, ...newState};
        case 'CLEAR_COMPLETED':
            newState = {
                todos: [...state.todos],
            };

            let needToRemove = true;
            while(needToRemove) {
                let wasRemoved = false;
                for(let i = 0; i < newState.todos.length; i++) {
                    if (newState.todos[i].status === "completed") {
                        newState.todos.splice(i, 1);
                        wasRemoved = true;
                        break;
                    }
                }

                if (!wasRemoved) {
                    needToRemove = false;
                }
            }

            return {...state, ...newState};
        default:
            return state;
    }
};

export default todos;

export function changeText(text) {
    return {
        type: "CHANGE",
        payload: { text },
    };
}

export function submitText() {
    return {
        type: "SUBMIT",
    };
}

export function remove(key) {
    return {
        type: "REMOVE",
        payload: { key }
    };
}

export function check(key) {
    return {
        type: "CHECK",
        payload: { key }
    };
}

export function changeStatus(status) {
    return {
        type: "CHANGE_STATUS",
        payload: { status }
    };
}

export function clearCompleted() {
    return {
        type: "CLEAR_COMPLETED",
    };
}