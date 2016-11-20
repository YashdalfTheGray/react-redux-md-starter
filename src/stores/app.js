import { createStore } from 'redux';

const initialState = {
    message: 'Redux Starter'
};

const actions = {
    updateMessage: message => {
        return {
            type: 'update_message',
            message
        };
    }
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'update_message':
            return { message: action.message };
        default:
            return state;
    }
};

const store = createStore(app);

export default { store, actions };
