import { ref } from 'config/constants';

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

// Fetch all events
export function fetchEvents (cb, errorCB) {
  ref.child('events').on('value', (snapshot) => {
    
    const events = snapshot.val() || {};
    console.log('Events: ', events);
    const sorted = Object.keys(events).sort((a, b) => events[b].timestamp - events[a].timestamp);
    cb({events, sorted});
  }, errorCB)
}