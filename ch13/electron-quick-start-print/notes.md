install 'request':

  npm install --save request


Tips:


1. Don't make requests in the renderer process, use ipc main instead (https://github.com/atom/electron/blob/master/docs/api/ipc-main.md)

