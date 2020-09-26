const MongoLib = require('../lib/mongo');

class NotesServices {
  constructor() {
    this.collection = 'notes';
    this.mongoDB = new MongoLib();
  }

  async getNotes({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const notes = await this.mongoDB.getAll(this.collection, query);
    return notes || [];
  }

  async getNote({ noteId }) {
    const note = await this.mongoDB.get(this.collection, noteId);
    return note || [];
  }

  async createNote({ note }) {
    const createNoteId = await this.mongoDB.create(this.collection, note);
    return createNoteId;
  }

  async updateNote({ noteId, note }) {
    const updateNoteId = await this.mongoDB.update(
      this.collection,
      noteId,
      note
    );
    return updateNoteId;
  }

  async deleteNote({noteId}) {
    const deleteNoteId = await this.mongoDB.delete(this.collection, noteId)
    return deleteNoteId;
  }
}

module.exports = NotesServices;
