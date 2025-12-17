# UnoCounter

UnoCounter es una aplicación web para gestionar y registrar partidas del juego de cartas UNO. Permite añadir jugadores, registrar puntuaciones por ronda, visualizar clasificaciones y estadísticas, y guardar el estado de la partida para continuarla más tarde.

## Características

- **Gestión de jugadores:** Añade, edita y elimina jugadores fácilmente.
- **Registro de puntuaciones:** Introduce las puntuaciones de cada jugador por ronda.
- **Clasificación en tiempo real:** Visualiza el ranking actualizado y el líder actual.
- **Historial y progreso:** Consulta la progresión de puntuaciones de cada jugador a lo largo de la partida.
- **Persistencia de datos:** Los datos se almacenan en un backend simulado con JSON Server.
- **Interfaz moderna:** UI responsiva construida con Vue 3, Vuetify y Pinia.
- **Notificaciones:** Feedback visual para acciones exitosas o con error.

## Tecnologías utilizadas

- [Vue 3](https://vuejs.org/)
- [Vite](https://vite.dev/)
- [Vuetify 3](https://vuetifyjs.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Chart.js](https://www.chartjs.org/)
- [JSON Server](https://github.com/typicode/json-server)
- [TypeScript](https://www.typescriptlang.org/)

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/DivuxDev/UnoCounter.git
   cd UnoCounter
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

## Uso en desarrollo

Para iniciar el frontend y el backend (JSON Server):

```sh
npm run dev
```
En otra terminal, ejecuta:
```sh
npm run server
```
- El frontend estará disponible en `http://localhost:5173`
- La API REST estará en `http://localhost:4434`

## Compilar para producción

```sh
npm run build
```

Esto generará la carpeta `dist` lista para desplegar.

## Despliegue con Docker

Puedes construir y ejecutar el proyecto con Docker:

```sh
docker build -t unocounter .
docker run -p 8080:8080 unocounter
```

## Configuración

- El archivo `.env` permite configurar la URL de la API:
  ```
  VITE_API_URL=http://localhost:4434
  ```

## Estructura del proyecto

```
src/
  components/    # Componentes Vue reutilizables
  views/         # Vistas principales de la app
  stores/        # Pinia stores (estado global)
  services/      # Servicios para acceso a datos/API
  models/        # Modelos TypeScript
  styles/        # Estilos globales y variables
  utils/         # Utilidades varias
public/          # Archivos estáticos
server/          # Middleware y configuración backend
db.json          # Base de datos simulada para JSON Server
```

## Licencia

MIT

---

Desarrollado por David Prado Mejuto.