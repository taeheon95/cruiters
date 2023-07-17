import { DateTime } from "luxon";

describe("윤년 테스트", () => {
  it("test case 1", () => {
    const result = DateTime.fromFormat("2100-02-29", "yyyy-LL-dd");
    expect(result.isValid).toBeFalsy();
  });
  it("test case 2", () => {
    const result = DateTime.fromFormat("2020-02-29", "yyyy-LL-dd");
    expect(result.isValid).toBeTruthy();
  });
});
