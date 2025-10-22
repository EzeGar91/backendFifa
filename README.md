# Backend API - Sistema de Jugadores

## 🚀 Inicio Rápido

### Instalación
```bash
npm install
```

### Configuración Inicial
```bash
# Crear base de datos y datos de prueba
npm run setup:dev
```

### Desarrollo
```bash
# Modo desarrollo con recarga automática
npm run dev

# Modo desarrollo con watch mejorado
npm run dev:watch

# Modo desarrollo con debug
npm run dev:debug
```

### Scripts Disponibles
- `npm run setup` - Crear base de datos
- `npm run seed` - Insertar datos de prueba
- `npm run setup:dev` - Setup completo + desarrollo

### Producción
```bash
npm start
```

## 📡 Endpoints Disponibles

### Health Check
- `GET /health` - Estado del servidor

### Jugadores
- `GET /api/players` - Obtener todos los jugadores
- `GET /api/players/search?name=&club=&position=` - Buscar jugadores
- `GET /api/players/export?name=&club=&position=` - Exportar CSV
- `POST /api/players` - Crear jugador
- `GET /api/players/:id` - Obtener jugador por ID
- `PUT /api/players/:id` - Actualizar jugador
- `DELETE /api/players/:id` - Eliminar jugador

## 🔧 Configuración

El servidor se ejecuta en `http://localhost:3000` por defecto.

### Variables de Entorno
Crea un archivo `.env` con:
```
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=futbol_db
DB_USER=root
DB_PASSWORD=
PORT=3000
```

## 📝 Desarrollo

- Los cambios se recargan automáticamente con `nodemon`
- Logs detallados en modo desarrollo
- Manejo de errores mejorado
- CORS habilitado para desarrollo frontend
- Datos de prueba incluidos (Messi, Ronaldo, Mbappé, Haaland, De Bruyne)

## 🧪 Pruebas

### Probar endpoints:
```bash
# Health check
curl http://localhost:3000/health

# Obtener todos los jugadores
curl http://localhost:3000/api/players

# Buscar por nombre
curl "http://localhost:3000/api/players/search?name=Messi"

# Buscar por club
curl "http://localhost:3000/api/players/search?club=Manchester%20City"

# Exportar CSV
curl "http://localhost:3000/api/players/export"
```
