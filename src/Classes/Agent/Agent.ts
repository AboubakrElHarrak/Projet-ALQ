import { StrategyMovement } from "../strategyMovement/StrategyMovement";
import { IndividualAgent } from "./IndividualAgent";

/**
 * The base class representing an agent in a simulation.
 * @abstract
 */
export abstract class Agent {
  /**
   * The type of the agent.
   * @protected
   */
  protected type: string;

  /**
   * The behavior strategy of the agent.
   * @protected
   */
  protected behavor: StrategyMovement;

  /**
   * Creates an instance of Agent.
   * @param {StrategyMovement} _behavor - The behavior strategy of the agent.
   * @param {string} _type - The type of the agent.
   */
  public constructor(_behavor: StrategyMovement, _type: string) {
    this.behavor = _behavor;
    this.type = _type;
  }

  /**
   * Returns the type of the agent.
   * @returns {string} - The type of the agent.
   */
  getType(): string {
    return this.type;
  }

  /**
   * Sets the type of the agent.
   * @param {string} _type - The type of the agent.
   */
  setType(_type: string): void {
    this.type = _type;
  }

  /**
   * The abstract method representing the behavior of the agent.
   * @abstract
   * @param {IndividualAgent[]} agents - The array of agents the agent will interact with.
   */
  public abstract behave(agents: IndividualAgent[]): void;
}
