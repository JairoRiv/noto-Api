const { notesMock } = require('../utils/mock/notes');

class NotesServices {
  async getNotes() {
    const notes = await Promise.resolve(notesMock);
    return notes || [];
  }

  async getNote() {
    const note = await Promise.resolve(notesMock[0]);
    return note || [];
  }

  async createNote() {
    const createNoteId = await Promise.resolve(notesMock[1].id);
    return createNoteId;
  }

  async updateNote() {
    const updateNoteId = await Promise.resolve(notesMock[2].id);
    return updateNoteId;
  }

  async deleteNote() {
    const deleteNoteId = await Promise.resolve(notesMock[3].id);
    return deleteNoteId;
  }
}

module.exports = NotesServices;
