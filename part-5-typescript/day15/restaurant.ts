import { EventEmitter } from "events";
import {
  RestaurantEvent,
  RestaurantEventName,
} from "./types/restaurant-events";

export class Restaurant extends EventEmitter {
  /**
   * Open the restaurant.
   */
  constructor() {
    super();
  }
  open() {
    (this.emit as RestaurantEvent)(RestaurantEventName.Open);
  }

  /**
   * Close the restaurant.
   */
  close() {
    this.emit(RestaurantEventName.Close);
  }

  /**
   * The table has been booked.
   * Treat it as just 1 less table.
   */
  reserveTable() {
    this.emit(RestaurantEventName.TableCountUpdate);
  }

  /**
   * Cancel the reservation.
   * Treat it as just 1 more table.
   */
  cancelTableReservation() {
    this.emit(RestaurantEventName.TableCountUpdate);
  }

  /**
   * Someone took a table without reservation.
   */
  takeTableWithoutReservation() {
    this.emit(RestaurantEventName.TableCountUpdate);
  }

  /**
   * The table broken down :/
   */
  markTableAsBroken() {
    this.emit(RestaurantEventName.TableCountUpdate);
  }

  /**
   * Someone just finished eating. Treat it as just 1 more table.
   */
  cleanupTable() {
    this.emit(RestaurantEventName.TableCountUpdate);
  }
}
