##Admin URL routing example

To test this example, the easiest way is to start it with `node index.js` or `npm start`, and then make a request with the expected authorization headers.

```javascript
curl --user admin:1234 http://127.0.0.1:3000/admin/
```

The `/users` routing can be tested with:


```javascript
curl --user admin:1234 http://127.0.0.1:3000/admin/users
```
