import { Agent } from "../Agent/Agent";
import { IndividualAgent } from "../Agent/IndividualAgent";

export interface StrategyMovement {
  move(agent: Agent, agents: IndividualAgent[]): void;
}
