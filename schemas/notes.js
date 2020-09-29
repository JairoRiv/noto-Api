const joi = require('@hapi/joi');

//Elements of the notes
const noteIdSchema = joi.string().regex(/[0-9a-fA-F]{24}$/);
const noteTitleSchema = joi.string().max(80);
const noteContentSchema = joi.string();
const noteDateSchema = joi.date();
const noteEmailSchema = joi.string().email()

//Create notes schemas
const createNoteSchema = {
  title: noteTitleSchema.required(),
  content: noteContentSchema.required(),
  email: noteEmailSchema.required(),
  createDate: noteDateSchema.required(),
};

const updateNoteSchema = {
  noteId: noteIdSchema.required(),
  title: noteTitleSchema,
  content: noteContentSchema,
  email: noteEmailSchema,
  updateDate: noteDateSchema.required(),
};

module.exports = { noteIdSchema, createNoteSchema, updateNoteSchema };
