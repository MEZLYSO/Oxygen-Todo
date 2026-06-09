export const NoteCard = ({ idNote, title, content, createdAt, deleteNote }) => {
  return (
    <div key={idNote} className="">
      <div className="border-1 border-slate-400 p-2 rounded-sm min-h-[320px] max-w-[250px]">
        <h3 className="font-bold">{title}</h3>
        <p className="text-wrap break-words line-clamp-11">{content}</p>
      </div>
      <button onClick={() => deleteNote(idNote)}>Eliminar</button>

      <button>Update</button>
    </div>
  );
};
