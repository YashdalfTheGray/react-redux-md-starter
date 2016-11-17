import { createStore } from 'redux';

const initialState = {
    message: 'Redux Starter'
};

const appActions = {
    UPDATE_MESSAGE: 'update_message'
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case appActions.UPDATE_MESSAGE:
            return { message: action.message };
        default:
            return state;
    }
};

export default {
    store: createStore(app),
    actions: appActions
};
