import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  currentPage: 'InitialPage'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_PAGE:
      return Object.assign({}, state, {
        currentPage: action.page
      });
    default:
      return state;
  }
}
