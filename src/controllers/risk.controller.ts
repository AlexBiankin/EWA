import { Body, Post, JsonController } from "routing-controllers";
import { UserProfile, UserRiskAssessment } from "../models";
import { UserService } from "../services";

@JsonController("/riskassesment")
export class RiskController {
  constructor(private userService: UserService) {}

  @Post()
  public calculateRisk(
    @Body({ validate: true }) userProfile: UserProfile
  ): UserRiskAssessment {
    return this.userService.assessRisk(userProfile);
  }
}
