import TicketRequestCalculator from "../src/pairtest/TicketRequestCalculator";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
let calculator;

describe("TicketRequestCalculator  Adult Boundary Checks", () => {
  beforeEach(() => {
    // reset any object state on the calculator
    calculator = new TicketRequestCalculator();
  });

  it("throws an error when a null is passed", () => {
    expect(() => {
      calculator.calculate(null);
    }).toThrow(); // to do - typed exceptions.
  });

  it("throws an error when a undefined is passed", () => {
    expect(() => {
      calculator.calculate(undefined);
    }).toThrow(); // to do - typed exceptions.
  });

  it("returns an object with correct fields", () => {
    var request = new TicketTypeRequest("ADULT", 1);
    var response = calculator.calculate(request);
    expect(response).toHaveProperty("messages");
    expect(response).toHaveProperty("cost");
  });

  it("is not a negative total of tickets", () => {
    var request = new TicketTypeRequest("ADULT", -1);
    var response = calculator.calculate(request);
    expect(response.messages).toContain(
      "please request between 1 and 20 tickets",
    );
  });

  it("is not a zero number of tickets", () => {
    var request = new TicketTypeRequest("ADULT", 0);
    var response = calculator.calculate(request);
    expect(response.messages).toContain(
      "please request between 1 and 20 tickets",
    );
  });

  it("is not a number of tickets over 20", () => {
    var request = new TicketTypeRequest("ADULT", 20);
    var response = calculator.calculate(request);
    expect(response.messages).not.toContain(
      "please request between 1 and 20 tickets",
    );
  });

  it("is a valid number of tickets at min", () => {
    var request = new TicketTypeRequest("ADULT", 1);
    var response = calculator.calculate(request);
    expect(response.messages).not.toContain(
      "please request between 1 and 20 tickets",
    );
  });

  test("is a valid number of tickets at max", () => {
    var request = new TicketTypeRequest("ADULT", 20);
    var response = calculator.calculate(request);
    expect(response.messages).not.toContain(
      "please request between 1 and 20 tickets",
    );
  });
});

describe("calculate adult ticket cost", () => {});

describe("calculate adult and children", () => {});

describe("calculate adult and infants", () => {});
describe("calculate adult, children and infants", () => {});
