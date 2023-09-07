const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Configurar la conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://Admin:gYIGh97Ge7GQBNLQ@cluster0.b4s6zxd.mongodb.net/DWHDT5', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  const TaskSchema = new mongoose.Schema({
    Index: String,
    OrgID: { type: String, alias: 'Organization Id' },
    Name: String,
    Website: String,
    Country: String,
    Description: String,
    Founded: Number,
    Industry: String,
    NumberEmployees: { type: Number, alias: 'Number of employees' },
  });

  const Task = mongoose.model('Task', TaskSchema, 'CargaDatosHT5');
  

  app.post('/tasks', async (req, res) => {
    try {
      const {
        Index,
        OrgID,
        Name,
        Website,
        Country,
        Description,
        Founded,
        Industry,
        NumberEmployees,
    } = req.body;
    const task = await Task.create({        
        Index,
        OrgID,
        Name,
        Website,
        Country,
        Description,
        Founded,
        Industry,
        NumberEmployees,
    });
    console.log('Respuesta de la base de datos:', task);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: 'Bad request' });
  }
});

app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });        

app.put('/tasks/:index', async (req, res) => {
    try {
      const indexValue = req.params.index;
      const updateData = req.body; 
  
      const updatedTask = await Task.findOneAndUpdate({ Index: indexValue }, updateData, {
        new: true, 
      });
  
      if (!updatedTask) {
        return res.status(404).json({ error: 'Not found' });
      }
  
      res.json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
app.delete('/tasks/:index', async (req, res) => {
    try {
      const indexValue = req.params.index;

      const deletedTask = await Task.findOneAndRemove({ Index: indexValue });
  
      if (!deletedTask) {
        return res.status(404).json({ error: 'Not found' });
      }
  
      res.json({ message: 'Sucess' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  