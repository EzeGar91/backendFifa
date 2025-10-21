const express = require('express');
const app = express();
const sequelize = require('./config/db');
const playerRoutes = require('./routes/playerRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/players', playerRoutes);

sequelize.sync().then(() => {
  console.log('DB connected and models synced');
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});
