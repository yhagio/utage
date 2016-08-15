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

// http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
export function getDistanceFromLatLonInKm (lat1, lng1, lat2, lng2) {
  // console.log('LATLNG', lat1,lng1,lat2,lng2);

  if (typeof lat1 !== 'number' ||
      typeof lng1 !== 'number' ||
      typeof lat2 !== 'number' ||
      typeof lng2 !== 'number') {
    return 0;
  }

  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2 - lat1);  // deg2rad below
  let dLng = deg2rad(lng2 - lng1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
    ;
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c; // Distance in km

  if (typeof d !== 'number') {
    return 0;
  }
  return Math.round(d);
}

function deg2rad (deg) {
  return deg * (Math.PI / 180);
}
