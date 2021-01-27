import { Service, Container } from "typedi";
import { UserProfile, UserRiskAssessment, UserPaymentInfo } from "../models";
import { QueryParser } from '../utils/queryParser';
import { EngineRulesToken } from '../di/tokens';

@Service()
export class UserService {
  constructor(private engineConfig: typeof EngineRulesToken = Container.get(EngineRulesToken)) {}
  assessRisk(userProfile: UserProfile): UserRiskAssessment {
    let baseRating = 5;
    userProfile.incomePerHour = this.getInfo().incomePerHour;
    const risk = QueryParser.assessRiskFromQuery(this.engineConfig, baseRating, userProfile);
    return { eligable_percentage: 100 - risk * 10 };
  }

  getInfo(): UserPaymentInfo {
    // mocked to have data about income per hour
    // should recieve userId
    return { incomePerHour: 101 };
  }
}