'use strict';
function asyncFunction(callback) {
  setTimeout(callback, 200);
}
let color = 'blue';
asyncFunction(() => {
  console.log('The color is', color);
});
color = 'green';
