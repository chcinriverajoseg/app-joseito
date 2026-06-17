# 💘 App-Joseito

Aplicación de matching social tipo Tinder — fullstack con React, Node.js, MongoDB y chat en tiempo real con Socket.io.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb)](https://mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8-010101?style=flat&logo=socket.io)](https://socket.io/)
[![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

🌐 **[Demo en vivo](https://app-joseito.vercel.app)**

---

## 🧪 Credenciales de prueba
Email:    demo@test.com
Password: 123456

---

## ✨ Funcionalidades

- 👤 **Registro y Login** — Autenticación con JWT + bcrypt
- 🔍 **Explorar perfiles** — Navega perfiles con foto, bio e intereses
- ❤️ **Sistema de Likes** — Da like y genera matches cuando es mutuo
- 🤝 **Matches** — Ve todos tus matches en una sola pantalla
- 💬 **Chat en tiempo real** — Mensajería instantánea con Socket.io
- 👤 **Perfil de usuario** — Edita tu información, foto, bio e intereses
- 🔒 **Rutas protegidas** — Solo usuarios autenticados acceden a las funciones principales

---

## 🛠️ Stack tecnológico

### Frontend
| Tecnología | Uso |
|---|---|
| React 18 | Interfaz de usuario |
| React Router v6 | Navegación y rutas protegidas |
| Tailwind CSS | Estilos y diseño responsive |
| Axios | Peticiones HTTP al backend |
| Socket.io Client | Chat en tiempo real |
| Vite | Bundler y servidor de desarrollo |
| Context API | Estado global del usuario |

### Backend
| Tecnología | Uso |
|---|---|
| Node.js + Express | Servidor y API REST |
| MongoDB + Mongoose | Base de datos y modelos |
| JWT | Autenticación con tokens |
| bcryptjs | Encriptación de contraseñas |
| Socket.io | Websockets para chat en tiempo real |
| Multer | Subida de imágenes de perfil |

---

## 🚀 Instalación local

**Requisitos:** Node.js 18+ · MongoDB (local o Atlas)

```bash
# Backend
cd backend
npm install
# Configura tu .env con MONGO_URI, JWT_SECRET y FRONTEND_URL
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

---

## 📁 Estructura del proyecto

app-joseito/
├── backend/
│   ├── controllers/
│   │   ├── userController.js     ← Registro, login, likes, matches
│   │   └── chats.controller.js   ← Mensajes y chats
│   ├── models/
│   │   ├── User.js               ← Modelo de usuario
│   │   ├── Match.js              ← Modelo de match
│   │   └── Message.js            ← Modelo de mensaje
│   ├── routes/
│   │   ├── userRoutes.js         ← /api/users
│   │   ├── matches.js            ← /api/matches
│   │   └── chats.routes.js       ← /api/chats
│   └── socket/
│       └── socketServer.js       ← Configuración Socket.io
└── frontend/
└── src/
├── pages/
│   ├── ExplorePage.jsx   ← Explorar perfiles
│   ├── MatchesPage.jsx   ← Mis matches
│   ├── ChatRoom.jsx      ← Chat en tiempo real
│   └── Perfil.jsx        ← Mi perfil
└── context/
└── UserContext.jsx   ← Estado global

---

## 👨‍💻 Autor

**Jose Gregorio Chacin**
- GitHub: [@chcinriverajoseg](https://github.com/chcinriverajoseg)

---

## 📄 Licencia

MIT License
