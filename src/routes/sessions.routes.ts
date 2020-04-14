import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const createSession = new CreateSessionService();

    const { user, token } = await createSession.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

export default sessionsRouter;