import { Token } from "typedi";
import { Logger } from "winston";
import { RiskEngineConfig } from "../models/engineRules";

export const LoggerToken = new Token<Logger>();
export const EngineRulesToken = new Token<RiskEngineConfig>();