import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketCalculationService from "../pairtest/service/TicketCalculationService.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  paymentService;
  seatReservationService;
  ticketCalculationService;

  constructor(
    paymentService = new TicketPaymentService(),
    seatReservationService = new SeatReservationService(),
    ticketCalculationService = new TicketCalculationService(),
  ) {
    this.paymentService = paymentService;
    this.seatReservationService = seatReservationService;
    this.ticketCalculationService = ticketCalculationService;
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    var result =
      this.ticketCalculationService.requestCalculation(ticketTypeRequests);

    //ADR: use a result with errors in it rather than an exception - wanted to demonstrate validation.
    if (result.errors.length > 0) {
      // we need to think about if the errors coming back are then thrown up the stack.
      // we could improve this, but for the sake of demonstration lets send all messasges
      result.errors.forEach((e) => console.log(e));
      throw new InvalidPurchaseException(
        `Invalid Purchase. Failed validation due to: ${result.errors.join(
          ", ",
        )}`,
      );
    } else {
      // tthis would be good if this was a transactional piece. unfortunately the API calls here doesn't allow it.
      this.seatReservationService.reserveSeat(accountId, result.totalSeats);
      this.paymentService.makePayment(accountId, result.cost);
    }
  }
}
