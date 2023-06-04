import request from "supertest";
import app from "./app";

test("post /", (done) => {
  request(app)
    .post("/")
    .send({
      data: "test",
    })
    .expect(200, "test", done);
});
