const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const roleRoutes = require('./src/routes/roleRoutes');

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/role', roleRoutes);

app.get('/', (req, res) =>
    res.send("Hello World"));

app.listen(port, () =>
    console.log(`Server ready on http://localhost:${port}`)
);

