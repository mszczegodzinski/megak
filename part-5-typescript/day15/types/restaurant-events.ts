export enum RestaurantEventName {
  TableCountUpdate = "tableCountUpdate",
  Open = "open",
  Close = "close",
}

export type RestaurantEvent = (eventName: RestaurantEventName) => {};
