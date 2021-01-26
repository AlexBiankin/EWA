import { Service } from "typedi";
import { UserProfile, UserRiskAssessment, UserPaymentInfo } from "../models";

@Service()
export class UserService {
  assessRisk(userProfile: UserProfile): UserRiskAssessment {
    let baseRating = 5;
    userProfile.terminated && (baseRating += 5);
    userProfile.employment_in_months < 3 && (baseRating += 2);
    userProfile.number_of_ewa_taken_in_period > 0 && (baseRating += 1);
    userProfile.number_of_ewa_taken_overall === 0 && (baseRating += 3);
    userProfile.number_of_ewa_taken_overall === 1 && (baseRating += 2);
    // mocked (we don't have this data in input)
    this.getInfo().incomePerHour > 100 ? (baseRating += 1) : null;
    userProfile.marital_status !== "married" && (baseRating += 2);
    userProfile.age < 23 && (baseRating += 1);

    return { eligable_percentage: 100 - baseRating * 10 };
  }

  getInfo(): UserPaymentInfo {
    // mocked to have data about income per hour
    // should recieve userId
    return { incomePerHour: 101 };
  }
}
