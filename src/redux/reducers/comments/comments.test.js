import comments from './comments';

it('returns an empty state when state is not given', () => {
  const returnedState = comments(undefined);
  const expectedState = [];

  expect(returnedState).toMatchObject(expectedState);
})