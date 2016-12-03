import { createStore } from 'redux';

const initialState = {
    message: 'Hello world!'
};

const actions = {
    updateMessage: message => {
        return {
            type: 'update_message',
            message
        };
    },
    resetMessage: () => {
        return {
            type: 'reset_message',
        }
    }
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'update_message':
            return { message: action.message };
        case 'reset_message':
            return initialState;
        default:
            return state;
    }
};

const store = createStore(app);

export { store, actions };
