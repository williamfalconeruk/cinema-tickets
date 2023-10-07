import { input} from "@inquirer/prompts";
import TicketCalculationService from "./src/pairtest/service/TicketCalculationService.js";
import TicketTypeRequest from "./src/pairtest/lib/TicketTypeRequest.js";

console.log(
  "Demonstrator Harness for the ticket calculation service. there's no validation on the prompts",
);
const adultTickets = await input({
  message: "how many adult tickets would you like",
});
const childTickets = await input({
  message: "how many child tickets would you like",
});
const infantTickets = await input({
  message: "how many infant tickets would you like",
});

let ticketCalculationService = new TicketCalculationService();

let adultRequest = new TicketTypeRequest("ADULT", Number(adultTickets));
let childRequest = new TicketTypeRequest("CHILD", Number(childTickets));
let infantRequest = new TicketTypeRequest("INFANT", Number(infantTickets));

let request = [adultRequest, childRequest, infantRequest];

let result = ticketCalculationService.requestCalculation(request);
console.log("The results are:");
console.dir(result);
