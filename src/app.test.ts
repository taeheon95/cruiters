import request from "supertest";
import app from "./app";

test("post /", (done) => {
  request(app).get("/").expect(200, "test", done);
});
