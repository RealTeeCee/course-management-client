export const addNewNotes = (notes = [], noteToAdd) => {
  const existingNote = notes.find(
    (note) => note.resumePoint === noteToAdd.resumePoint
  );
  console.log(existingNote);
  if (existingNote) {
    return notes.map((note) =>
      note.resumePoint === noteToAdd.resumePoint
        ? { ...note, description: noteToAdd.description }
        : note
    );
  }
  return [...notes, noteToAdd];
};

export const deleteNotes = (notes = [], noteId) => {
  return notes.filter((note) => note.id !== noteId);
};
