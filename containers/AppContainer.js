import { connect } from 'react-redux';
import { changeText, submitText, remove, check, changeStatus, clearCompleted } from "../reducers/todos";
import App from "../components/App";

const mapStateToProps = state => {
    return {
        todos: state.todos,
        text: state.text,
        status: state.status,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: text => {
            dispatch(changeText(text));
        },
        onInputSubmit: () => {
            dispatch(submitText());
        },
        onRemove: key => {
            dispatch(remove(key));
        },
        onCheck: key => {
            dispatch(check(key));
        },
        onChangeStatus: status => {
            dispatch(changeStatus(status));
        },
        onClearCompleted: () => {
            dispatch(clearCompleted());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);