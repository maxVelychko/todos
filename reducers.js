const initialState = {
    todos: [],
    text: "",
};

const todos = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case 'CHANGE':
            newState = { text: action.payload.text };
            return {...state, ...newState};
        case 'SUBMIT':
            const todo = { text: state.text, key: `${Math.random()}` };
            newState = {
                todos: [...state.todos, ...[todo]],
                text: "",
            };
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