const express = require('express');
const { notesMock } = require('../utils/mock/notes');

//Create the CRUD function
const notesApi = (app) => {
  const router = express.Router();
  app.use('/api/notes', router);

  router.get('/', async (req, res, next) => {
    try {
      const notes = await Promise.resolve(notesMock);

      res.status(200).json({
        data: notes,
        message: 'notes listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:noteId', async (req, res, next) => {
    try {
      const note = await Promise.resolve(notesMock[0]);

      res.status(200).json({
        data: note,
        message: 'note retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const createNoteId = await Promise.resolve(notesMock[0].id);

      res.status(201).json({
        data: createNoteId,
        message: 'note create',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:noteId', async (req, res, next) => {
    try {
      const updateNoteId = await Promise.resolve(notesMock[0].id);

      res.status(200).json({
        data: updateNoteId,
        message: 'note updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:noteId', async (req, res, next) => {
    try {
      const deleteNoteId = await Promise.resolve(notesMock[0].id);

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
