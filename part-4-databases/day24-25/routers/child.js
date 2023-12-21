const { Router } = require('express');
const { ChildRecord } = require('../records/child.record');
const { GiftRecord } = require('../records/gift.record');
const { ValidationError } = require('../utils/errors');

const childRouter = Router();

childRouter
  .get('/', async (req, res) => {
    const childrenList = await ChildRecord.listAll();
    const giftList = await GiftRecord.listAll();

    res.render('children/list', {
      childrenList,
      giftList,
    });
  })

  .post('/', async (req, res) => {
    const newChild = new ChildRecord(req.body);
    await newChild.insert();

    res.redirect('/child');
  })

  .patch('/gift/:childId', async (req, res) => {
    const child = await ChildRecord.getOne(req.params.childId);

    if (!child) {
      throw new ValidationError('No children found.');
    }

    const gift =
      req.body.giftId === '' ? null : await GiftRecord.getOne(req.body.giftId);

    if (gift) {
      if (gift.count <= (await gift.countGivenGifs())) {
        throw new ValidationError('This gift is no longer available');
      }
    }

    child.giftId = gift?.id ?? null;
    await child.update();

    res.redirect('/child');
  });

module.exports = {
  childRouter,
};
