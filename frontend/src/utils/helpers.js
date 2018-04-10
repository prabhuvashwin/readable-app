// https://stackoverflow.com/questions/45661767/javascript-guid-global-unique-identifier-generator-explanation
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4()
}

// https://stackoverflow.com/questions/85116/display-date-time-in-users-locale-format-and-time-offset
export function formatTimestamp(timestamp) {
  const d = new Date(timestamp)
  return d.toLocaleString()
}
