// You should be able to paste this into a browser
function getAllKeys() {
  return Object.keys(localStorage);
}

function getAllKeysAndValues() {
  return getAllKeys()
    .reduce((obj, str) => { 
      obj[str] = localStorage.getItem(str); 
      return obj;
    }, {});
}

// Get all values
const allValues = getAllKeys().map(key => localStorage.getItem(key));
console.log('allValues:', allValues);
