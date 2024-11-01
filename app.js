const express = require('express');
const multer = require('multer');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const roleRoutes = require('./src/routes/roleRoutes');
const fileRoutes = require('./src/routes/fileRoutes');
const permissionRoutes = require('./src/routes/permissionRoutes');


const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

// Configurar multer para manejar los archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use('/auth', authRoutes); 
app.use('/user', userRoutes);
app.use('/role', roleRoutes);
// app.use('/file', fileRoutes);
app.use('/file', fileRoutes(upload));
app.use('/permission', permissionRoutes);



app.get('/', (req, res) =>
    res.send("Hello World"));

app.listen(port, () =>
    console.log(`Server ready on http://localhost:${port}`)
);

