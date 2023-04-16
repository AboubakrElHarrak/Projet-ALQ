import { Agent } from "../Agent/Agent";
import { IndividualAgent } from "../Agent/IndividualAgent";

/**
 * Represents a strategy movement for agents.
 */
export interface StrategyMovement {
  /**
   * Moves the given agent according to the implemented strategy.
   *
   * @param {Agent} agent - The agent to be moved.
   * @param {IndividualAgent[]} agents - The list of all agents in the simulation.
   */
  move(agent: Agent, agents: IndividualAgent[]): void;
}
