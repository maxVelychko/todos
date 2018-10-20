const initialState = {
    todos: [],
    value: "",
};

const todos = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE':
            return Object.assign({}, state, {
                text: action.text,
            });
        default:
            return state
    }
};

export default todos;

export function changeValue(text) {
    return {
        type: "CHANGE",
        payload: { text },
    };
}