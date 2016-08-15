
const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';
const CHECKED_NOTIFICATION = 'CHECKED_NOTIFICATION';

function checkedNotification (bool, status) {
  return {
    type: CHECKED_NOTIFICATION,
    bool,
    status
  };
}

function updateNotification (bool, status) {
  return {
    type: UPDATE_NOTIFICATION,
    bool,
    status
  };
}

export function checkNotificationEnabled () {
  return function (dispatch) {
    if (Notification.permission === 'granted') {
      return dispatch(checkedNotification(true, 'granted'));
    }

    if (Notification.permission === 'denied') {
      return dispatch(checkedNotification(true, 'denied'));
    }
    return;
  };
}

export function handleUpdateNotification (status) {
  console.log('Invoked: ', status);

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

const initialState = {
  notificationEnabled: false,
  status: 'default'
};

export default function account (state = initialState, action) {
  switch (action.type) {

    case CHECKED_NOTIFICATION :
      return {
        ...state,
        notificationEnabled: action.bool,
        status: action.status
      };

    case UPDATE_NOTIFICATION :
      return {
        ...state,
        notificationEnabled: action.bool,
        status: action.status
      };

    default :
      return state;
  }
}
