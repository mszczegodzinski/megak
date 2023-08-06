const { EventEmitter } = require('events');

class Restaurant extends EventEmitter {
  /**
   * Open the restaurant.
   */
  constructor() {
    super();
  }
  open() {
    this.emit('open');
  }

  /**
   * Close the restaurant.
   */
  close() {
    this.emit('close');
  }

  /**
   * The table has been booked.
   * Treat it as just 1 less table.
   */
  reserveTable() {
    this.emit('reserve table');
  }

  /**
   * Cancel the reservation.
   * Treat it as just 1 more table.
   */
  cancelTableReservation() {
    this.emit('cancel reservation');
  }

  /**
   * Someone took a table without reservation.
   */
  takeTableWithoutReservation() {
    this.emit('take table without reservation');
  }

  /**
   * The table broken down :/
   */
  markTableAsBroken() {
    this.emit('mark table as broken');
  }

  /**
   * Someone just finished eating. Treat it as just 1 more table.
   */
  cleanupTable() {
    this.emit('cleanup table');
  }
}

module.exports = {
  Restaurant,
};
