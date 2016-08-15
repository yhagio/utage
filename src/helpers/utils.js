export function formatDateTime (dateTime) {
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  return new Date(dateTime)
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'});
}

export function limitText (text, limit) {
  if (text.length < limit) {
    return text;
  }
  return text.slice(0, limit - 3) + '...';
}