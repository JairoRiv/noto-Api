const joi = require('@hapi/joi');

//Elements of the notes
const noteIdSchema = joi.string().regex(/[0-9a-fA-F]{24}$/);
const noteTitleSchema = joi.string().max(80);
const noteContentSchema = joi.string();
const noteDateSchema = joi.date();

//Create notes schemas
const createNoteSchema = {
  title: noteTitleSchema.required(),
  content: noteContentSchema.required(),
  createDate: noteDateSchema.required(),
};

const updateNoteSchema = {
  noteId: noteIdSchema.required(),
  title: noteTitleSchema,
  content: noteContentSchema,
  updateDate: noteDateSchema.required(),
};

module.exports = { createNoteSchema, updateNoteSchema };
