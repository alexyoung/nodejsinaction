const readFile = require('fs').readFile;
const yargs = require('yargs');
const argv = yargs
  .demand('f')
  .nargs('f', 1)
  .describe('f', 'JSON file to parse')
  .argv;
const file = argv.f;
readFile(file, (err, dataBuffer) => {
  const value = JSON.parse(dataBuffer.toString());
  console.log(JSON.stringify(value));
});
