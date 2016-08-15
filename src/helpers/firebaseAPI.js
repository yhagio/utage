import { ref } from 'config/constants';

/** ***************
 * Event Creation
 *****************/

// Save a new event to '/events'
function saveToEvents (event) {
  const eventId = ref.child('events').push().key;
  const eventPromise = ref.child(`events/${eventId}`).set({...event, eventId});
  return {
    eventId,
    eventPromise
  };
}

// Save a new event to the creator's events list
function saveToUsersEvents (event, eventId) {
  return ref.child(`usersEvents/${event.uid}/${eventId}`)
    .set({...event, eventId});
}

// Flow of saving a newly created event
export function saveEvent (event) {
  const { eventId, eventPromise } = saveToEvents(event);

  return Promise.all([
    eventPromise,
    saveToUsersEvents(event, eventId),
    saveAttendance(eventId)
  ]).then(() => ({...event, eventId}));
}

/** ***************
 * Events (Home)
 *****************/

// Fetch all events
export function fetchEvents (callback, errorCallback) {
  ref.child('events').on('value', (snapshot) => {
    // Events objects
    const events = snapshot.val() || {};

    // DESC order of events by timestamp
    const sorted = Object.keys(events).sort((a, b) => {
      return events[b].timestamp - events[a].timestamp;
    });

    // Callback all events objects & array of DESC ordered IDs
    callback({events, sorted});
  }, errorCallback);
}

/** ***************
 * Single Event Page
 *****************/

// Get single event
export function fetchSingleEvent (eventId) {
  return ref.child(`events/${eventId}`).once('value')
    .then((snapshot) => snapshot.val());
}

// Get single user
export function fetchSingleUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val());
}

/** ***************
 * Update an event as author
 *****************/

export function updateEvent (eventId, event) {
  return ref.child(`events/${eventId}`).set(event)
    .then(() => event);
}

/** ***************
 * Delete an event as author
 *****************/

// Delete from 'events', 'attendance', and 'usersEvents'
export function deleteEvent (eventId, event) {
  return Promise.all([
    ref.child(`events/${eventId}`).set(null),
    ref.child(`attendance/${eventId}`).set(null),
    ref.child(`usersEvents/${event.uid}/${eventId}`).set(null)
  ]).then(() => '/');
}

/** ***************
 * Attendance of an event
 *****************/

export function fetchAttendance (eventId) {
  return ref.child(`attendance/${eventId}`).once('value')
    .then((snapshot) => {
      return snapshot.val() || 0;
    });
}

// This is called when an event is created
export function saveAttendance (eventId) {
  return ref.child(`attendance/${eventId}`).set(0);
}

export function incrementAttendance (eventId) {
  return ref.child(`attendance/${eventId}`)
    .transaction((count = 0) => {
      return count + 1;
    });
}

export function decrementAttendance (eventId) {
  return ref.child(`attendance/${eventId}`)
    .transaction((count = 0) => {
      return count - 1;
    });
}

/** ***************
 * User's attendance
 *****************/

export function fetchUsersAttendance (uid) {
  return ref.child(`usersAttendance/${uid}`).once('value')
    .then((snapshot) => {
      return snapshot.val() || {};
    });
}

export function saveToUsersAttendance (uid, eventId) {
  return ref.child(`usersAttendance/${uid}/${eventId}`).set(true);
}

export function deleteFromUsersAttendance (uid, eventId) {
  return ref.child(`usersAttendance/${uid}/${eventId}`).set(null);
}
