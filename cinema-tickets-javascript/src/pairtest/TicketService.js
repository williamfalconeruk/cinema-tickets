import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketRequestValidator from "./TicketRequestValidator.js";
import TicketValidatorResult from './lib/TicketValidatorResult.js'

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {

  
    var validator = new TicketRequestValidator();
    var result =  validator.validate(ticketTypeRequests);
    if (result.messages.length() > 0){

      // we need to think about if the errors coming back are then thrown up the stack.
      _.each(result.messages,(e)=>console.log(e))
      throw new InvalidPurchaseException("Invalid Purchase");
    }
      else {
        // TODO the requests are valid, we then need to calculate.
      }
  }
}
