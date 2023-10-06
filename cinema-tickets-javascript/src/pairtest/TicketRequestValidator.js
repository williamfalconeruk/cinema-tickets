import TicketValidatorResult from "./lib/TicketValidatorResult.js";

export default class TicketRequestValidator {
  constructor() {}

  validate(requests) {
    if (requests == null) throw new Error();
    // we cant be sure how many adult, child and infant requests there are in the incoming
    // so we need to potentially aggregate those requests.
    let adultRequestCount = this.getTicketTotalFor(requests, "ADULT");

    let childRequestCount = this.getTicketTotalFor(requests, "CHILD");

    let infantRequestCount = this.getTicketTotalFor(requests, "INFANT");

    console.log(adultRequestCount);

    let totaltickets =
      adultRequestCount + childRequestCount + infantRequestCount;

    var result = new TicketValidatorResult();

    // get it working for the single case
    if (totaltickets < 1 || totaltickets > 20) {
      result.messages.push("please request between 1 and 20 tickets in total"); // possibly constant or even resource string this out.
    }

    // validate you have enough adults for children (maybe infants - to write a test for that)
    if(childRequestCount > adultRequestCount){
      result.messages.push("Child tickets can only be purchased up to the same number of adult ones.")      
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
