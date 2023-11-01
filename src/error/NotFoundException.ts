import httpStatus from "http-status-codes";

import Exception from "./Exception";

class NotFoundException extends Exception {

  constructor(
    message = "Couldn't find resource"
  ) {
    super(
      "Not Found",
      message,
      httpStatus.NOT_FOUND
    );
  }

}

export default NotFoundException;
