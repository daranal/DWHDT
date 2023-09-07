const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const argon2 = require('argon2');

const app = express();
const port = 3000;
const secretKey = 'desarrolloweb';
const Segundos = 300;
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Admin:gYIGh97Ge7GQBNLQ@cluster0.b4s6zxd.mongodb.net/DWHDT7', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const collectionName = 'Usuarios'; 
const User = mongoose.model('User', userSchema, collectionName);

app.use(bodyParser.json());

app.get('/login', async (req, res) => {
  try {
    const tasks = await User.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});       

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const passwordValid = await argon2.verify(user.password, password);

    if (!passwordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al iniciar sesión' });
  }
});

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (typeof token !== 'undefined') {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.sendStatus(403); // Forbidden
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

app.get('/data', verifyToken, (req, res) => {
  res.json({ message: 'Información protegida', user: req.user });
});

