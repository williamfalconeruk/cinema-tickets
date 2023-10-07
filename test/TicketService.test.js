import TicketPaymentService from "../src/thirdparty/paymentgateway/TicketPaymentService";
import SeatReservationService from "../src/thirdparty/seatbooking/SeatReservationService";
import TicketCalculationService from "../src/pairtest/service/TicketCalculationService";
import TicketCalculationResult from "../src/pairtest/service/TicketCalculationResult";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException";
jest.mock("../src/thirdparty/seatbooking/SeatReservationService");
jest.mock("../src/thirdparty/paymentgateway/TicketPaymentService");
jest.mock("../src/pairtest/service/TicketCalculationService");

import { toBeEmpty } from "jest-extended";
import TicketService from "../src/pairtest/TicketService";

expect.extend({ toBeEmpty });

mockMakePayment = jest.fn(() => {
  console.log("payment made!");
});
mockReserveSeat = jest.fn(() => {
  console.log("seat reserved!");
});
mockRequestCalculation = jest.fn(() => {
  return new TicketCalculationResult([], null, null);
});

describe("Mock out service injections and test Ticket Service", () => {
  beforeAll(() => {
    // we dont care about the implementation here, just that it fires.
    SeatReservationService.mockImplementation(() => {
      return {
        reserveSeat: mockReserveSeat,
      };
    });
    TicketPaymentService.mockImplementation(() => {
      return {
        makePayment: mockMakePayment,
      };
    });
  });
  beforeEach(() => {
    SeatReservationService.mockClear();
    TicketPaymentService.mockClear();
    TicketCalculationService.mockClear();
  });
  it("empty result, throws an error", () => {
    TicketCalculationService.mockImplementation(() => {
      return {
        requestCalculation: jest
          .fn()
          .mockImplementation(
            () => new TicketCalculationResult(["Some Error"], null, null),
          ),
      };
    });

    let ticketPaymentService = new TicketPaymentService();
    let seatReservationService = new SeatReservationService();
    let ticketCalculationService = new TicketCalculationService();
    let ticketService = new TicketService(
      ticketPaymentService,
      seatReservationService,
      ticketCalculationService,
    );

    expect(() => ticketService.purchaseTickets(12345, [])).toThrow(); // the values here not relevant as mocked.

    expect(ticketCalculationService.requestCalculation).toBeCalled();
    expect(seatReservationService.reserveSeat).not.toBeCalled();
    expect(ticketPaymentService.makePayment).not.toBeCalled();
  });
  it("valid result, calls the other services", () => {
    TicketCalculationService.mockImplementation(() => {
      return {
        requestCalculation: jest
          .fn()
          .mockImplementation(() => new TicketCalculationResult([], 100.0, 5)),
      };
    });

    let ticketPaymentService = new TicketPaymentService();
    let seatReservationService = new SeatReservationService();
    let ticketCalculationService = new TicketCalculationService();
    let ticketService = new TicketService(
      ticketPaymentService,
      seatReservationService,
      ticketCalculationService,
    );

    expect(() => ticketService.purchaseTickets(12345, [])).not.toThrow(); // the values here not relevant as mocked.

    expect(ticketCalculationService.requestCalculation).toBeCalled();
    expect(seatReservationService.reserveSeat).toBeCalled();
    expect(ticketPaymentService.makePayment).toBeCalled();
  });
});
