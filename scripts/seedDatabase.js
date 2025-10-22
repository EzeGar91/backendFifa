const Player = require('../models/player');
const sequelize = require('../config/db');

async function seedDatabase() {
  try {
    // Sincronizar el modelo con la base de datos
    await sequelize.sync({ force: true });
    console.log('✅ Database synchronized');

    // Datos de prueba
    const players = [
      {
        name: 'Lionel Messi',
        age: 36,
        nationality: 'Argentina',
        club: 'Inter Miami',
        position: 'RW',
        overall: 91
      },
      {
        name: 'Cristiano Ronaldo',
        age: 39,
        nationality: 'Portugal',
        club: 'Al Nassr',
        position: 'ST',
        overall: 88
      },
      {
        name: 'Kylian Mbappé',
        age: 25,
        nationality: 'France',
        club: 'Real Madrid',
        position: 'ST',
        overall: 91
      },
      {
        name: 'Erling Haaland',
        age: 24,
        nationality: 'Norway',
        club: 'Manchester City',
        position: 'ST',
        overall: 91
      },
      {
        name: 'Kevin De Bruyne',
        age: 33,
        nationality: 'Belgium',
        club: 'Manchester City',
        position: 'CAM',
        overall: 90
      }
    ];

    // Insertar jugadores
    await Player.bulkCreate(players);
    console.log('✅ Sample players inserted');

    // Verificar que se insertaron
    const count = await Player.count();
    console.log(`📊 Total players in database: ${count}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
