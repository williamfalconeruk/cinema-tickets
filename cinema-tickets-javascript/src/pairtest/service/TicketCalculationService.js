import TicketCalculationResult from "./TicketCalculationResult.js";

export default class TicketCalculationService {
  //CONSTANTS - TODO: make these a configurable either by injection of a config object or constructor values
  ADULT_COST = 20.0;
  CHILD_COST = 10.0;

  constructor() {}

  requestCalculation(requests) {
    if (requests == null) throw new Error();
    // we cant be sure how many adult, child and infant requests there are in the incoming
    // so we need to potentially aggregate those requests.
    let adultRequestCount = this.getTicketTotalFor(requests, "ADULT");

    let childRequestCount = this.getTicketTotalFor(requests, "CHILD");

    let infantRequestCount = this.getTicketTotalFor(requests, "INFANT");

    let totaltickets =
      adultRequestCount + childRequestCount + infantRequestCount;

    var result = new TicketCalculationResult();

    // you have the total tickets allowed, check we have no more than 20 to order.
    if (totaltickets < 1 || totaltickets > 20) {
      result.errors.push("please request between 1 and 20 tickets in total"); // possibly constant or even resource string this out.
    }

    // validate you have enough adults for children and infants
    if (childRequestCount + infantRequestCount > adultRequestCount) {
      result.errors.push(
        "Child or infant tickets can only be purchased up to the same number of adult ones.",
      );
    }
    //assume we have validated all of the rules.
    // add the cost up and the total seats to allocate
    if (result.errors.length == 0) {
      result.cost =
        adultRequestCount * this.ADULT_COST +
        childRequestCount * this.CHILD_COST;
      result.totalSeats = adultRequestCount + childRequestCount;
    }
    return result;
  }

  // work out a ticket total for each ticket type
  getTicketTotalFor(requests, ticketType) {
    return requests
      .filter((request) => request.getTicketType() === ticketType)
      .reduce((sum, request) => sum + request.getNoOfTickets(), 0);
  }
}
