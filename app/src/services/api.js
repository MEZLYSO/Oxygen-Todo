const BASE = "http://localhost:8080";

async function request(method, path, body) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error en la petición");
  return data;
}

export const api = {
  getFoldersByUser: (idUser) => request("GET", `/folder/${idUser}`),
  createFolder: (body) => request("POST", "/folder", body),
  updateFolder: (body) => request("PUT", "/folder", body),
  deleteFolder: (id) => request("DELETE", `/folder/${id}`),

  getNotesByFolder: (idFolder) => request("GET", `/note/${idFolder}`),
  getNoteById: (idNote) => request("GET", `/folder/note/${idNote}`),
  createNote: (body) => request("POST", "/note", body),
  updateNote: (body) => request("PUT", "/note", body),
  deleteNote: (id) => request("DELETE", `/note/${id}`),

  login: (body) => request("POST", "/login", body),
  getUserById: (idUser) => request("GET", `/auth/${idUser}`),
  updatePremium: (body) => request("PUT", "/user/premium", body),
  updateUser: (body) => request("PUT", "/user", body),
};
