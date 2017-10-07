import posts from './posts';

it('returns an empty state when state is not given', () => {
  const returnedState = posts(undefined);
  const expectedState = [];

  expect(returnedState).toMatchObject(expectedState);
})