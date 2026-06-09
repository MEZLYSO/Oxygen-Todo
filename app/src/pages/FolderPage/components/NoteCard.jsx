export const NoteCard = ({ idNote, title, content, createdAt, deleteNote }) => {
  return (
    <div key={idNote} className="border-1 rounded-lg">
      <h3 className="font-bold">{title}</h3>
      <p>{content}</p>
      <small style={{ color: "gray" }}>Creado: {createdAt}</small>
      <button onClick={() => deleteNote(idNote)}>Eliminar</button>
      <button>Update</button>
    </div>
  );
};
