import httpStatus from "http-status-codes";

import Exception from "./Exception";

class BadRequestException extends Exception {

  constructor(
    message = "Something isn't right in your request"
  ) {
    super(
      "Bad Request",
      message,
      httpStatus.BAD_REQUEST
    );
  }

}

export default BadRequestException;
