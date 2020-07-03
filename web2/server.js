var express = require('express');
var app = express();

app.use(express.static('public'));

// Server auf Port 3000 starten
app.listen(3000, function () {
    console.log('Frontend on port 3000');
});
