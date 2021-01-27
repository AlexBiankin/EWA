import axios from "axios";
import { DEFAULT_PORT, BASE_PATH } from "../../src/init";

const axiosInstance = axios.create({
  baseURL: `http://localhost:${DEFAULT_PORT}${BASE_PATH}`,
});

const validRiskCheckInput = {
  age: 35,
  marital_status: "married",
  employment_in_months: 13,
  number_of_ewa_taken_in_period: 1,
  number_of_ewa_taken_overall: 2,
  terminated: false,
};

describe("should verify risk assesment", () => {
  it("should give correct eligable_percentage for validRiskCheckInput", async () => {
    const result = await axiosInstance.post(
      "/riskassesment",
      validRiskCheckInput
    );
    expect(result.data.eligable_percentage).toEqual(30);
  });

  it("should give correct eligable_percentage for terminated employee", async () => {
    const result = await axiosInstance.post("/riskassesment", {
      ...validRiskCheckInput,
      terminated: true,
    });
    expect(result.data.eligable_percentage).toEqual(-20);
  });

  it("should give validation error for wrong age", async () => {
    try {
      await axiosInstance.post("/riskassesment", {
        ...validRiskCheckInput,
        age: "WRONG",
      });
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.statusText).toEqual("Bad Request");
      expect(
        error.response.data.errors.some(
          (error: any) => error.property === "age"
        )
      ).toBeTruthy();
    }
  });

  it("should give validation error for wrong marital_status", async () => {
    try {
      await axiosInstance.post("/riskassesment", {
        ...validRiskCheckInput,
        marital_status: 1234567,
      });
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.statusText).toEqual("Bad Request");
      expect(
        error.response.data.errors.some(
          (error: any) => error.property === "marital_status"
        )
      ).toBeTruthy();
    }
  });

  it("should give validation error for wrong employment_in_months", async () => {
    try {
      await axiosInstance.post("/riskassesment", {
        ...validRiskCheckInput,
        employment_in_months: "WRONG",
      });
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.statusText).toEqual("Bad Request");
      expect(
        error.response.data.errors.some(
          (error: any) => error.property === "employment_in_months"
        )
      ).toBeTruthy();
    }
  });

  it("should give validation error for wrong number_of_ewa_taken_in_period", async () => {
    try {
      await axiosInstance.post("/riskassesment", {
        ...validRiskCheckInput,
        number_of_ewa_taken_in_period: "WRONG",
      });
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.statusText).toEqual("Bad Request");
      expect(
        error.response.data.errors.some(
          (error: any) => error.property === "number_of_ewa_taken_in_period"
        )
      ).toBeTruthy();
    }
  });

  it("should give validation error for wrong number_of_ewa_taken_overall", async () => {
    try {
      await axiosInstance.post("/riskassesment", {
        ...validRiskCheckInput,
        number_of_ewa_taken_overall: "WRONG",
      });
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.statusText).toEqual("Bad Request");
      expect(
        error.response.data.errors.some(
          (error: any) => error.property === "number_of_ewa_taken_overall"
        )
      ).toBeTruthy();
    }
  });

  it("should give validation error for wrong terminated", async () => {
    try {
      await axiosInstance.post("/riskassesment", {
        ...validRiskCheckInput,
        terminated: "WRONG",
      });
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.statusText).toEqual("Bad Request");
      expect(
        error.response.data.errors.some(
          (error: any) => error.property === "terminated"
        )
      ).toBeTruthy();
    }
  });
});
