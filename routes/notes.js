const express = require('express');
const NotesServices = require('../services/notes');

//Create the CRUD function
const notesApi = (app) => {
  const router = express.Router();
  app.use('/api/notes', router);

  const notesService = new NotesServices();

  router.get('/', async (req, res, next) => {
    const { tags } = req.query;

    try {
      const notes = await notesService.getNotes({ tags });

      res.status(200).json({
        data: notes,
        message: 'notes listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:noteId', async (req, res, next) => {
    const { noteId } = req.params;

    try {
      const note = await notesService.getNote({ noteId });

      res.status(200).json({
        data: note,
        message: 'note retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    const { body: note } = req;

    try {
      const createNoteId = await notesService.createNote({ note });

      res.status(201).json({
        data: createNoteId,
        message: 'note create',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:noteId', async (req, res, next) => {
    const { noteId } = req.params;
    const { body: note } = req;

    try {
      const updateNoteId = await notesService.updateNote({ noteId, note });

      res.status(200).json({
        data: updateNoteId,
        message: 'note updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:noteId', async (req, res, next) => {
    const { noteId } = req.params;

    try {
      const deleteNoteId = await notesService.deleteNote({ noteId });

      res.status(200).json({
        data: deleteNoteId,
        message: 'note deleted',
      });
    } catch (err) {
      next(err);
    }
  });
};

module.exports = notesApi;
