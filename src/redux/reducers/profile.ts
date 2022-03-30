import { AnyAction } from 'redux';

const initialState = {
  name: '[UserName]',
  icon: 'https://picsum.photos/id/237/30'
};

export const profileReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
