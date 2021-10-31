const app = require('./app/app')
const port = 3000;

app.listen(port, function () {
    console.log(`Express server listening on port http://localhost:${port}`);
});