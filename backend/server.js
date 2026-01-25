const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: path.join(__dirname, '.env', '.env.example') });
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { sequelize } = require('./models');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3001;

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('DB connection error:', err));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
