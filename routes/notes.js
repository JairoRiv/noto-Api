const express = require('express');
const NotesServices = require('../services/notes');

//Import Schemas
const {
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} = require('../schemas/notes');

//Import middleware for validate schema
const validationHandler = require('../utils/middleware/validationHandler');

//Import cache Control
const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');

//Create the CRUD function
const notesApi = (app) => {
  const router = express.Router();
  app.use('/api/notes', router);

  const notesService = new NotesServices();

  router.get('/', async (req, res, next) => {
    cacheResponse(set, FIVE_MINUTES_IN_SECONDS);
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

  router.get(
    '/:noteId',
    validationHandler({ noteId: noteIdSchema }, 'params'),
    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
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
    }
  );

  router.post(
    '/',
    validationHandler(createNoteSchema),
    async (req, res, next) => {
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
    }
  );

  router.put(
    '/:noteId',
    validationHandler({ noteId: noteIdSchema }, 'params'),
    async (req, res, next) => {
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
    }
  );

  router.delete(
    '/:noteId',
    validationHandler({ noteId: noteIdSchema }, 'params'),
    async (req, res, next) => {
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
    }
  );
};

module.exports = notesApi;
