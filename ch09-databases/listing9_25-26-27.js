const post = { id: '1' };
const comment = { id: '1' };

localStorage.setItem(`/posts/${post.id}`, post);
localStorage.setItem(`/comments/${comment.id}`, comment);

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

function getNamespaceItems(namespace) {
  return getAllKeys().filter(key => key.startsWith(namespace));
}

function expensiveWork() {
}

// subsequent calls with the same argument will fetch the memoized result
function memoizedExpensiveOperation(data) {
  const key = `/memoized/${JSON.stringify(data)}`;
  const memoizedResult = localStorage.getItem(key);
  if (memoizedResult != null) return memoizedResult;
  // do expensive work
  const result = expensiveWork(data);
  // save result to localStorage, never calculate again
  localStorage.setItem(key, result);
  return result;
}

memoizedExpensiveOperation('example');
console.log(getNamespaceItems('/memoized'));
console.log(getNamespaceItems('/comments'));
