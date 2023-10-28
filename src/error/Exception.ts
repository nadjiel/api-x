import httpStatus from "http-status-codes";

class Exception extends Error {

  public status: number;

  constructor(
    name = "Internal server error",
    message = "Something went wrong!",
    status = httpStatus.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.name = name;
    this.status = status;
  }

}

export default Exception;
