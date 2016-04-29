import * as ActionTypes from '../constants/ActionTypes';

export function changePage(page) {
  return {
    type: ActionTypes.CHANGE_PAGE,
    page
  };
}
