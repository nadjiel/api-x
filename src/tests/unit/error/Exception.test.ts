import Exception from "../../../error/Exception";

describe("Class Exception", () => {
  test("Creates an Exception with the default parameters", () => {
    const err = new Exception();

    expect(err).toHaveProperty("name", "Internal server error");
    expect(err).toHaveProperty("message", "Something went wrong!");
    expect(err).toHaveProperty("status", 500);
  });

  test("Creates an Exception with the received parameters", () => {
    const name = "Not found";
    const message = "Couldn't find the resource!";
    const status = 404;

    const err = new Exception(
      name,
      message,
      status
    );

    expect(err).toHaveProperty("name", name);
    expect(err).toHaveProperty("message", message);
    expect(err).toHaveProperty("status", status);
  });
});
