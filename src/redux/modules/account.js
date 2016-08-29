import { Map } from 'immutable';
// import { fetchSingleUser } from '../../helpers/firebaseAPI';
// import { firebaseAuth } from '../../config/constants';

export const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';
export const CHECKED_NOTIFICATION = 'CHECKED_NOTIFICATION';
// const FETCHING_USER_INFO = 'FETCHING_USER_INFO';
// const FETCHING_USER_INFO_SUCCESS = 'FETCHING_USER_INFO_SUCCESS';
// const FETCHING_USER_INFO_ERROR = 'FETCHING_USER_INFO_ERROR';

export function checkedNotification (bool, status) {
  return {
    type: CHECKED_NOTIFICATION,
    bool,
    status
  };
}

export function updateNotification (bool, status) {
  return {
    type: UPDATE_NOTIFICATION,
    bool,
    status
  };
}

// function fetchingUserInfo () {
//   return {
//     type: FETCHING_USER_INFO
//   };
// }

// function fetchingUserInfoSuccess (user) {
//   return {
//     type: FETCHING_USER_INFO_SUCCESS,
//     user
//   };
// }

// function fetchingUserInfoError (error) {
//   return {
//     type: FETCHING_USER_INFO_ERROR,
//     error: 'Could not fetch user info'
//   };
// }

// check notification status on initial load
export function checkNotificationEnabled () {
  return function (dispatch) {
    if (window.Notification.permission === 'granted') {
      return dispatch(checkedNotification(true, 'granted'));
    }

    if (window.Notification.permission === 'denied') {
      return dispatch(checkedNotification(true, 'denied'));
    }
    return;
  };
}

// update notification status
export function handleUpdateNotification (status) {
  return function (dispatch) {
    if (status === 'granted') {
      return dispatch(updateNotification(true, status));
    }

    if (status === 'denied') {
      return dispatch(updateNotification(false, status));
    }
    return;
  };
}

// export function fetchAndHandleUser () {
//   return function(dispatch, getState) {
//     console.log('account', getState()); debugger;
//     const uid = getState().users.get('authedUser').get('uid');

//     dispatch(fetchingUserInfo());
//     fetchSingleUser(uid)
//       .then((user) => dispatch(fetchingUserInfoSuccess(user)))
//       .catch((err) => dispatch(fetchingUserInfoError(err)));
//   };
// }

const initialState = Map({
  // user: {},
  // isFetching: false,
  // error: '',
  notificationEnabled: false,
  status: 'default'
});

export default function account (state = initialState, action) {
  switch (action.type) {

    case CHECKED_NOTIFICATION :
      return state.merge({
        notificationEnabled: action.bool,
        status: action.status
      });

    case UPDATE_NOTIFICATION :
      return state.merge({
        notificationEnabled: action.bool,
        status: action.status
      });
    
    // case FETCHING_USER_INFO :
    //   return state.merge({
    //     isFetching: true,
    //     error: ''
    //   });
    
    // case FETCHING_USER_INFO_SUCCESS :
    //   return state.merge({
    //     isFetching: false,
    //     error: '',
    //     user: action.user
    //   });

    // case FETCHING_USER_INFO_ERROR :
    //   return state.merge({
    //     isFetching: false,
    //     error: action.error
    //   });

    default :
      return state;
  }
}
