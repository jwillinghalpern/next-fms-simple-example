export function shortenString(str) {
  const len = 200;
  if (str.length > len) {
    return str.slice(0, len) + '...';
  }
  return str;
}

export function combineName(first = '', middle = '', last = '') {
  return `${first} ${middle} ${last}`.trim();
}

export function objectDiff(obj1, obj2) {
  const diff = {};
  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) {
      diff[key] = obj2[key];
    }
  }
  return diff;
}

export function objectIsEmpty(obj) {
  return Object.keys(obj).length === 0;
}
