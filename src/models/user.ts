import { IsInt, Length, IsBoolean, Min, Max } from "class-validator";

export class UserProfile {
  @IsInt()
  age: number;

  @Length(0, 20)
  marital_status: string;

  @IsInt()
  employment_in_months: number;

  @IsInt()
  number_of_ewa_taken_in_period: number;

  @IsInt()
  number_of_ewa_taken_overall: number;

  @IsBoolean()
  terminated: boolean;
}

export class UserRiskAssessment {
  eligable_percentage: number;
}

export class UserPaymentInfo {
  @IsInt()
  incomePerHour: number;
}
