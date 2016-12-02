import test from 'tape';
import { store, actions } from './app';

test('app store', t => {
    t.test('gets initial state', t => {
        t.equal(store.getState().message, 'Hello world!');
        t.end();
    });

    t.test('dispatch message change action', t => {
        t.equal(store.getState().message, 'Hello world!');
        store.dispatch(actions.updateMessage('Test'));
        t.equal(store.getState().message, 'Test');
        t.end();
    });
});
