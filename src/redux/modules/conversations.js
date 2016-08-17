import {
  saveConversation,
  fetchConversations
} from '../../helpers/firebaseAPI';

const FETCHING_CONVERSATIONS = 'FETCHING_CONVERSATIONS';
const FETCHING_CONVERSATIONS_ERROR = 'FETCHING_CONVERSATIONS_ERROR';
const FETCHING_CONVERSATIONS_SUCCESS = 'FETCHING_CONVERSATIONS_SUCCESS';

const ADD_CONVERSATION = 'ADD_CONVERSATION';
const ADD_CONVERSATION_ERROR = 'ADD_CONVERSATION_ERROR';
const REMOVE_CONVERSATION = 'REMOVE_CONVERSATION';

function addConversation (eventId, conversation) {
  return {
    type: ADD_CONVERSATION,
    eventId,
    conversation,
  }
}

function addConversationError (error) {
  console.warn(error)
  return {
    type: ADD_CONVERSATION_ERROR,
    error: 'Failed to save conversation',
  }
}

function removeConversation (eventId, ConversationId) {
  return {
    type: REMOVE_CONVERSATION,
    ConversationId,
  }
}

function fetchingConversations () {
  return {
    type: FETCHING_CONVERSATIONS,
  }
}

function fetchingConversationsError (error) {
  console.warn(error)
  return {
    type: FETCHING_CONVERSATIONS_ERROR,
    error: 'Error fetching CONVERSATIONS',
  }
}

function fetchingConversationsSuccess (eventId, conversations) {
  return {
    type: FETCHING_CONVERSATIONS_SUCCESS,
    conversations,
    eventId,
    lastUpdated: Date.now(),
  }
}

export function addAndHandleConversation (eventId, conversation) {
  return function (dispatch, getState) {
    const { conversationWithId, conversationPromise } = saveConversation(eventId, conversation)

    dispatch(addConversation(eventId, conversationWithId))
    conversationPromise
    .catch((error) => {
      dispatch(removeConversation(eventId, conversationWithId.conversationId))
      dispatch(addConversationError(error))
    })
  }
}

export function fetchAndHandleConversations (eventId) {
  return function (dispatch, getState) {
    dispatch(fetchingConversations())

    fetchConversations(eventId)
      .then((conversations) => {
        return dispatch(fetchingConversationsSuccess(eventId, conversations));
      })
      .catch((error) => {
        return dispatch(fetchingConversationsError(error));
      });
  }
}

/**
 * Conversation format
 * - uid
 * - body (comment)
 * - timestamp
 * - conversationId
 */

const initialState = {
  error: '',
  isFetching: false,
  conversations: {}
}