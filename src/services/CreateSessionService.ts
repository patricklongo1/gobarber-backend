import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Email/Password does not match');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Email/Password does not match');
    }

    const token = sign({}, 'kajidi251a651h51uj51adadhrf1hera', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default CreateSessionService;
