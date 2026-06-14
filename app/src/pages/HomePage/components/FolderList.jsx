import { Folder } from "./Folder";

export const FolderList = ({ listFolders, handleDeleteFolder, handleOpenEdit }) => {

  return (
    <>
      {listFolders.length === 0 ? (
        <p className="text-center">No se encontraron elementos...</p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-8 px-5">
          {listFolders.map((folder) => (
            <li key={folder.idFolder} className="list-none">
              <Folder
                name={folder.title}
                idFolder={folder.idFolder}
                handleDeleteFolder={handleDeleteFolder}
                handleOpenEdit={handleOpenEdit}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
