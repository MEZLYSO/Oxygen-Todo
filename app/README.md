# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## API Service

All requests go through `src/services/api.js`.

```js
import { api } from "../../services/api";

// Folders
const folders = await api.getFoldersByUser(1);
await api.createFolder({ title: "Nueva", idUser: 1 });
await api.updateFolder({ idFolder: 1, title: "Editado" });
await api.deleteFolder(1);

// Notes
const notes = await api.getNotesByFolder(1);
await api.createNote({ title: "Nota", content: "...", idFolder: 1 });
await api.updateNote({ idNote: 1, title: "...", content: "..." });
await api.deleteNote(1);

// Auth
const user = await api.login({ email: "...", password: "..." });
```
