const { Restaurant } = require('./restaurant');

const megaRestaurant = new Restaurant();
let tablesCount = 25;

megaRestaurant
  .once('open', () => {
    console.log('The restaurant has opened.');
  })
  .on('take table without reservation', () => {
    console.log('Available tables: ', --tablesCount);
  })
  .on('reserve table', () => {
    console.log('Available tables: ', --tablesCount);
  })
  .on('cancel reservation', () => {
    console.log('Available tables: ', ++tablesCount);
  })
  .on('cleanup table', () => {
    console.log('Available tables: ', ++tablesCount);
  })
  .once('close', () => {
    console.log('The restaurant has closed.');
  });

megaRestaurant.open(); // "The restaurant has opened."

megaRestaurant.takeTableWithoutReservation(); // "Available tables: 24."

megaRestaurant.takeTableWithoutReservation(); // "Available tables: 23."

megaRestaurant.reserveTable(); // "Available tables: 22."

megaRestaurant.cancelTableReservation(); // "Available tables: 23."

megaRestaurant.reserveTable(); // "Available tables: 22."

megaRestaurant.reserveTable(); // "Available tables: 21."

megaRestaurant.takeTableWithoutReservation(); // "Available tables: 20."

megaRestaurant.takeTableWithoutReservation(); // "Available tables: 19."

megaRestaurant.cleanupTable(); // "Available tables: 20."

megaRestaurant.close(); // "The restaurant has closed."
