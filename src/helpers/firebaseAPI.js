import { ref } from 'config/constants';

/*****************
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
    saveToUsersEvents(event, eventId)
  ]).then(() => ({...event, eventId}));
}

/*****************
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
  }, errorCallback)
}

/*****************
 * Single Event Page
 *****************/

// Get single event
export function fetchSingleEvent (eventId) {
  return ref.child(`events/${eventId}`).once('value')
    .then((snapshot) => snapshot.val())
}

// Get single user
export function fetchSingleUser(uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val())
}