import TicketRequestValidator from "../src/pairtest/TicketRequestValidator";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
let calculator;

describe("TicketRequestValidator  Adult Boundary Checks", () => {
  beforeEach(() => {
    // reset any object state on the calculator
    calculator = new TicketRequestValidator();
  });

  it("throws an error when a null is passed", () => {
    expect(() => {
      calculator.validate(null);
    }).toThrow(); // to do - typed exceptions.
  });

  it("throws an error when a undefined is passed", () => {
    expect(() => {
      calculator.validate(undefined);
    }).toThrow(); // to do - typed exceptions.
  });

  it("returns an object with correct fields", () => {
    var request = [new TicketTypeRequest("ADULT", 1)];
    var response = calculator.validate(request);
    expect(response).toHaveProperty("messages");
    expect(response).toHaveProperty("cost");
  });

  it("is not a negative total of tickets", () => {
    var request = [new TicketTypeRequest("ADULT", -1)];
    var response = calculator.validate(request);
    expect(response.messages).toContain(
      "please request between 1 and 20 tickets",
    );
  });

  it("is not a zero number of tickets", () => {
    var request = [new TicketTypeRequest("ADULT", 0)];
    var response = calculator.validate(request);
    expect(response.messages).toContain(
      "please request between 1 and 20 tickets",
    );
  });

  it("is not a number of tickets over 20", () => {
    var request = [new TicketTypeRequest("ADULT", 20)];
    var response = calculator.validate(request);
    expect(response.messages).not.toContain(
      "please request between 1 and 20 tickets",
    );
  });

  it("is a valid number of tickets at min", () => {
    var request = [new TicketTypeRequest("ADULT", 1)];
    var response = calculator.validate(request);
    expect(response.messages).not.toContain(
      "please request between 1 and 20 tickets",
    );
  });

  it("is a valid number of tickets at max", () => {
    var request = [new TicketTypeRequest("ADULT", 20)];
    var response = calculator.validate(request);
    expect(response.messages).not.toContain(
      "please request between 1 and 20 tickets",
    );
  });
});

describe("validate adult ticket cost", () => {});

describe("validate adult and children", () => {});

describe("validate adult and infants", () => {});
describe("validate adult, children and infants", () => {});
