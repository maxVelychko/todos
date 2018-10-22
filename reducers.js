const initialState = {
    todos: [],
    text: "",
};

let id = 1;

const todos = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case 'CHANGE':
            newState = { text: action.payload.text };
            return {...state, ...newState};
        case 'SUBMIT':
            const todo = { text: state.text, key: `${id++}` };
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