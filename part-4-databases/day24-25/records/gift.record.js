class GiftRecord {
  static listAll() {
    return [
      {
        id: 'gift01',
        name: 'dollhouse',
        count: 5,
      },
      {
        id: 'gift02',
        name: 'car',
        count: 3,
      },
    ];
  }
}

module.exports = {
  GiftRecord,
};
