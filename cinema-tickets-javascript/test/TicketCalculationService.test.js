import TicketCalculationService from "../src/pairtest/service/TicketCalculationService";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
import { toBeEmpty } from "jest-extended";
expect.extend({ toBeEmpty });

let calculationService;

describe("TicketRequestValidator Adult Boundary Checks", () => {
  beforeEach(() => {
    // reset any object state on the validator -though there shouldn't be any.
    calculationService = new TicketCalculationService();
  });

  it("throws an error when a null is passed", () => {
    expect(() => {
      calculationService.requestCalculation(null);
    }).toThrow(); // to do - typed exceptions.
  });

  it("throws an error when a undefined is passed", () => {
    expect(() => {
      calculationService.requestCalculation(undefined);
    }).toThrow(); // to do - typed exceptions.
  });

  it("returns an object with correct fields", () => {
    var request = [new TicketTypeRequest("ADULT", 1)];
    var response = calculationService.requestCalculation(request);
    expect(response).toHaveProperty("errors");
    expect(response).toHaveProperty("cost");
    expect(response).toHaveProperty("totalSeats");
  });

  it("is not a negative total of tickets", () => {
    var request = [new TicketTypeRequest("ADULT", -1)];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toContain(
      "please request between 1 and 20 tickets in total",
    );
    //todo possibly fix to nulls in this case
    expect(response.cost).toBeNull();
    expect(response.totalSeats).toBeNull();
  });

  it("is not a zero number of tickets", () => {
    var request = [new TicketTypeRequest("ADULT", 0)];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toContain(
      "please request between 1 and 20 tickets in total",
    );
    expect(response.cost).toBeNull();
    expect(response.totalSeats).toBeNull();
  });

  it("is a max adult ticket request, 20 seats and £400", () => {
    var request = [new TicketTypeRequest("ADULT", 20)];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).not.toContain(
      "please request between 1 and 20 tickets in total",
    );
    expect(response.cost).toEqual(400.0);
    expect(response.totalSeats).toEqual(20);
  });

  it("is a valid number of tickets at min, 1 seat and costs £20", () => {
    var request = [new TicketTypeRequest("ADULT", 1)];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).not.toContain(
      "please request between 1 and 20 tickets in total",
    );
    expect(response.cost).toEqual(20.0);
    expect(response.totalSeats).toEqual(1);
  });
});

describe("validate adult and children", () => {
  beforeEach(() => {
    // reset any object state on the validator
    calculationService = new TicketCalculationService();
  });

  it("should not pe possible to purchase a child ticket on its own", () => {
    var request = [new TicketTypeRequest("CHILD", 1)];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toContain(
      "Child or infant tickets can only be purchased up to the same number of adult ones.",
    );
    expect(response.cost).toBeNull();
    expect(response.totalSeats).toBeNull();
  });

  it("goes over the limit for Tickets when 20 adults and 1 child ticket is requested", () => {
    var request = [
      new TicketTypeRequest("ADULT", 20),
      new TicketTypeRequest("CHILD", 1),
    ];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toContain(
      "please request between 1 and 20 tickets in total",
    );
    expect(response.cost).toBeNull();
    expect(response.totalSeats).toBeNull();
  });
  it("goes over the limit for Tickets when 20 adults and 1 child ticket is requested", () => {
    var request = [
      new TicketTypeRequest("ADULT", 20),
      new TicketTypeRequest("CHILD", 1),
    ];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toContain(
      "please request between 1 and 20 tickets in total",
    );
    expect(response.cost).toBeNull();
    expect(response.totalSeats).toBeNull();
  });

  it("should not be possible to purchase more child tickets than adults", () => {
    var request = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("CHILD", 2),
    ];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toContain(
      "Child or infant tickets can only be purchased up to the same number of adult ones.",
    );
    expect(response.cost).toBeNull();
    expect(response.totalSeats).toBeNull();
  });

  it("should be valid and return one adult and child allocation, costing £30", () => {
    var request = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("CHILD", 1),
    ];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toBeEmpty();
    expect(response.cost).toEqual(30);
    expect(response.totalSeats).toEqual(2);
  });
  it("should be valid and return 10 adult and 10 child allocation, costing £300", () => {
    var request = [
      new TicketTypeRequest("ADULT", 10),
      new TicketTypeRequest("CHILD", 10),
    ];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toBeEmpty();
    expect(response.cost).toEqual(300.0);
    expect(response.totalSeats).toEqual(20);
  });
});

describe("validate adult and infants", () => {
  beforeEach(() => {
    // reset any object state on the validator
    calculationService = new TicketCalculationService();
  });

  it("should not pe possible to purchase an infant ticket on its own", () => {
    var request = [new TicketTypeRequest("INFANT", 1)];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toContain(
      "Child or infant tickets can only be purchased up to the same number of adult ones.",
    );
    expect(response.cost).toBeNull();
    expect(response.totalSeats).toBeNull();
  });

  it("should not be possible to purchase more infant tickets than adults", () => {
    var request = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("INFANT", 2),
    ];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toContain(
      "Child or infant tickets can only be purchased up to the same number of adult ones.",
    );
    expect(response.cost).toBeNull();
    expect(response.totalSeats).toBeNull();
  });

  it("should be valid and return one adult and no infant allocation, costing £20", () => {
    var request = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("INFANT", 1),
    ];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toBeEmpty();
    expect(response.cost).toEqual(20);
    expect(response.totalSeats).toEqual(1);
  });
  it("should be valid and return 10 adult and no infant allocation, costing £200", () => {
    var request = [
      new TicketTypeRequest("ADULT", 10),
      new TicketTypeRequest("INFANT", 10),
    ];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toBeEmpty();
    expect(response.cost).toEqual(200.0);
    expect(response.totalSeats).toEqual(10);
  });
});
describe("validate adult, children and infants", () => {
  beforeEach(() => {
    // reset any object state on the validator
    calculationService = new TicketCalculationService();
  });
  it("should not be possible to purchase when 20 adults and 1 child  and  1 infant ticket is requested", () => {
    var request = [
      new TicketTypeRequest("ADULT", 20),
      new TicketTypeRequest("INFANT", 1),
      new TicketTypeRequest("CHILD", 1),
    ];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toContain(
      "please request between 1 and 20 tickets in total",
    );
    expect(response.cost).toBeNull();
    expect(response.totalSeats).toBeNull();
  });

  it("should not be possible to purchase when 0 adults and 0 child  and  0 infant ticket is requested", () => {
    var request = [
      new TicketTypeRequest("ADULT", 0),
      new TicketTypeRequest("INFANT", 0),
      new TicketTypeRequest("CHILD", 0),
    ];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toContain(
      "please request between 1 and 20 tickets in total",
    );
    expect(response.cost).toBeNull();
    expect(response.totalSeats).toBeNull();
  });

  it("should not be possible to purchase more child and infant tickets than adults", () => {
    var request = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("CHILD", 1),
      new TicketTypeRequest("INFANT", 1),
    ];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toContain(
      "Child or infant tickets can only be purchased up to the same number of adult ones.",
    );
    expect(response.cost).toBeNull();
    expect(response.totalSeats).toBeNull();
  });

  it("should be possible to purchase 2 separate adults with one child and infant ticket, 3 seats and £50", () => {
    var request = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("CHILD", 1),
      new TicketTypeRequest("INFANT", 1),
    ];
    var response = calculationService.requestCalculation(request);
    expect(response.errors).toBeEmpty();
    expect(response.cost).toEqual(50.0);
    expect(response.totalSeats).toEqual(3);
  });
});
