import {expect} from 'chai';
import {todos} from '../reducers';

describe('The todos reducers', () => {
    it('Adds a new todo when create_todo action is received', () => {
        const fakeTodo = {text: 'Hello', isCompleted: false};
        const fakeAction = {
            type: 'CREATE_TODO',
            payload: {
                todo: fakeTodo,
            },
        }

        const originalState = {isLoading: false, data: []};

        const expected = {
            isLoading: false,
            data: [fakeTodo],
        };

        const actual = todos(originalState, fakeAction);

        expect(actual).to.deep.equal(expected);
    });
});