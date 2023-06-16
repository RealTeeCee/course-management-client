export const addNewNotes = (notes = [], noteToAdd) => {
  const existingNote = notes.find(
    (note) =>
      note.resumePoint === noteToAdd.resumePoint &&
      note.sectionId === noteToAdd.sectionId &&
      note.lessonId === noteToAdd.lessonId
  );
  console.log(existingNote);
  if (existingNote) {
    return notes.map((note) =>
      note.resumePoint === noteToAdd.resumePoint &&
      note.sectionId === noteToAdd.sectionId &&
      note.lessonId === noteToAdd.lessonId
        ? {
            ...note,
            lessonId: noteToAdd.lessonId,
            sectionId: noteToAdd.sectionId,
            description: noteToAdd.description,
          }
        : note
    );
  }
  return [noteToAdd, ...notes];
};

export const deleteNotes = (notes = [], noteId) => {
  return notes.filter((note) => note.id !== noteId);
};
