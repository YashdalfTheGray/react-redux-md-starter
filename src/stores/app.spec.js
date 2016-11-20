import test from 'tape';
import app from './app';
const { store, actions } = app;

test('app store', t => {
    t.test('gets initial state', t => {
        t.equal(store.getState().message, 'Redux Starter');
        t.end();
    });

    t.test('dispatch message change action', t => {
        t.equal(store.getState().message, 'Redux Starter');
        store.dispatch(actions.updateMessage('Test'));
        t.equal(store.getState().message, 'Test');
        t.end();
    });
});
