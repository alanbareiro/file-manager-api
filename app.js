const express = require('express');
const cors = require('cors');

const userRoutes = require('./src/routes/userRoutes');
const roleRoutes = require('./src/routes/roleRoutes');
const fileRoutes = require('./src/routes/fileRoutes');
const permissionRoutes = require('./src/routes/permissionRoutes');


const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/role', roleRoutes);
app.use('/file', fileRoutes);
app.use('/permission', permissionRoutes);



app.get('/', (req, res) =>
    res.send("Hello World"));

app.listen(port, () =>
    console.log(`Server ready on http://localhost:${port}`)
);

