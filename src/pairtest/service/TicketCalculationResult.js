export default class TicketCalculationResult {
  errors = [];
  totalSeats = null;
  cost = null;

  constructor(errors = [], totalSeats = null, cost = null) {
    this.errors = errors;
    this.totalSeats = totalSeats;
    this.cost = cost;
  }
}
