const { Router } = require('express');
const { ChildRecord } = require('../records/child.record');
const { GiftRecord } = require('../records/gift.record');

const childRouter = Router();

childRouter.get('/', (req, res) => {
  const childrenList = ChildRecord.listAll();
  const giftList = GiftRecord.listAll();

  res.render('children/list', {
    childrenList,
    giftList,
  });
});

module.exports = {
  childRouter,
};
