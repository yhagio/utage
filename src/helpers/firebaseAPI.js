import { ref } from 'config/constants';

function saveToEvents (event) {
  const eventId = ref.child('events').push().key;
  const eventPromise = ref.child(`events/${eventId}`).set({...event, eventId});
  return {
    eventId,
    eventPromise
  };
}

function saveToUsersEvents (event, eventId) {
  return ref.child(`usersEvents/${event.uid}/${eventId}`)
    .set({...event, eventId});
}

export function saveEvent (event) {
  const { eventId, eventPromise } = saveToEvents(event);

  return Promise.all([
    eventPromise,
    saveToUsersEvents(event, eventId)
  ]).then(() => ({...event, eventId}));
}