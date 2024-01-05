import { Router } from 'express';
import { WarriorRecord } from '../records/warrior.record';
import { ValidationError } from '../utils/errors';

export const warriorRouter = Router();

warriorRouter
  .get('/add-form', (req, res) => {
    res.render('warrior/add-form', {});
  })
  .post('/', async (req, res) => {
    const { power, defense, stamina, agility, name } = req.body;
    const warrior = new WarriorRecord({
      ...req.body,
      power: Number(power),
      defense: Number(defense),
      stamina: Number(stamina),
      agility: Number(agility),
    });

    if (await WarriorRecord.isNameTaken(name)) {
      throw new ValidationError(`Imię ${name} jest zajęte! Wybierz inne!`);
    } else {
      const id = await warrior.insert();
      res.render('warrior/warrior-added.hbs', {
        name: warrior.name,
        id,
      });
    }
  });
