/* eslint-disable spellcheck/spell-checker */
import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (_req, res) => {
  res.send('respond with a resource');
});

export default router;
