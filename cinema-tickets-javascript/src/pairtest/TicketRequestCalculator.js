import TicketCalculatorResult from "./lib/TicketCalculatorResult.js";

export default class TicketRequestCalculator {
  constructor() {}

  calculate(request) {
    if (request == null) throw new Error();

    var result = new TicketCalculatorResult();
    var totaltickets = request.getNoOfTickets();
    // get it working for the single case
    if (totaltickets < 1 || totaltickets > 20) {
      result.messages.push("please request between 1 and 20 tickets"); // possibly constant or even resource string this out.
    }

    return result;
  }
}
