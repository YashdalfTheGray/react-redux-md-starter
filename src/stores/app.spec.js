import test from 'tape';
import app from './app';

test('app store', t => {
    t.test('gets initial state', t => {
        t.equal(app.store.getState().message, 'Redux Starter');
        t.end();
    });
});
