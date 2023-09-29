import TicketCalculatorResult  from "./lib/TicketCalculatorResult.js";



 export default class TicketRequestCalculator{
 
    constructor(){

    }

     calculate(request){
        
        if (request == null) throw new Error();

        var result = new TicketCalculatorResult();
        // get it working for the single case
        if (request.getNoOfTickets() < 1 || request.getNoOfTickets() > 20){
            result.messages.push("please request between 1 and 20 tickets"); // possibly constant or even resource string this out.
        }


        return result;
    }
}