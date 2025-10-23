const User = require('../models/user');
const sequelize = require('../config/db');

async function createAdmin() {
  try {
    // Sincronizar modelos
    await sequelize.sync();
    console.log('✅ Modelos sincronizados');

    // Verificar si ya existe un admin
    const existingAdmin = await User.findOne({ where: { role: 'admin' } });
    
    if (existingAdmin) {
      console.log('✅ Ya existe un usuario administrador');
      return;
    }

    // Crear usuario admin
    const admin = await User.create({
      username: 'admin',
      email: 'admin@fifa.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('✅ Usuario administrador creado:');
    console.log('   Username: admin');
    console.log('   Email: admin@fifa.com');
    console.log('   Password: admin123');
    console.log('   Role: admin');

  } catch (error) {
    console.error('❌ Error creando admin:', error);
  } finally {
    await sequelize.close();
  }
}

createAdmin();
