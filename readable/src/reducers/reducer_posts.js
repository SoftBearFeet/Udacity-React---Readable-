import _ from 'lodash';

import { FETCH_POSTS, FETCH_CATEGORY_POSTS } from '../actions';

export default function (state = {}, action) {

  const { payload } = action;

  switch (action.type) {

    case FETCH_CATEGORY_POSTS:
      return _.mapKeys(payload.data, 'id');

    case FETCH_POSTS:
      return _.mapKeys(payload.data, 'id');

    default: return state;
  }

} 