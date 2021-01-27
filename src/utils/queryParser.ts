import { UserProfile } from "../models";

export class QueryParser {
  private static operatorMap: any = {
    neq: (a: any, b: any) => a !== b,
    eq: (a: any, b: any) => a === b,
    gt: (a: any, b: any) => a > b,
    gte: (a: any, b: any) => a >= b,
    lt: (a: any, b: any) => a < b,
    lte: (a: any, b: any) => a <= b,
  };

  public static assessRiskFromQuery(
    query: any,
    baseRisk: number = 5,
    userProfile: UserProfile
  ): number {
    // run through config and apply calculation for corresponding user properties
    return Object.keys(query).reduce((riskPoints, userProp: string) => {
      if (userProfile[userProp]) {
        riskPoints += this.calculateRiskModifier(userProfile[userProp], query[userProp]);
      }
      return riskPoints;
    }, baseRisk);
  }

  private static calculateRiskModifier(
    valueToAssess: any,
    conditionObj: any
  ): number {
    // deal with OR, AND conditions withing config file
    if (conditionObj["or"]) {
      return conditionObj["or"]
        .map((condition: any) => this.checkCondition(valueToAssess, condition.opearator, condition))
        .reduce((a: number, b: number) => a + b); // risk points for confition
    } else {
      const andConitions = Object.keys(conditionObj).reduce(
        (riskPoints: Array<number>, el) => {
          riskPoints.push(this.checkCondition(valueToAssess, el, conditionObj[el]));
          return riskPoints;
        },
        []
      );
      // if it's AND then we need all conditions to be true
      if (andConitions.every((riskPoint) => riskPoint > 0)) {
        return andConitions.reduce((a: number, b: number) => a + b);
      }
      return 0;
    }
  }

  private static checkCondition(
    propValue: any,
    operator: string,
    condition: any
  ) {
    let modifier = 0;
    if (this.operatorMap[operator](propValue, condition.value)) {
      modifier = condition.ratingModifier;
    }
    return modifier;
  }
}
