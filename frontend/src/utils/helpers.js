export const sortByScore = (post1, post2) => {
  if (post1.voteScore > post2.voteScore) {
    return 1
  }

  if (post1.voteScore < post2.voteScore) {
    return -1
  }

  return 0
}

export const sortByDate = (post1, post2) => {
  if (post1.timestamp > post2.timestamp) {
    return 1
  }

  if (post1.timestamp < post2.timestamp) {
    return -1
  }

  return 0
}

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export const randomId = () => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (var i = 20; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
