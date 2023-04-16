import { GroupStrategyMovement } from "../strategyMovement/GroupStrategyMovement";
import { Agent } from "./Agent";
import { IndividualAgent } from "./IndividualAgent";

/**
 * Represents a group of individual agents with a collective behavior.
 * @extends Agent
 */
export class AgentGroup extends Agent {
  private listAgents: IndividualAgent[];

  /**
   * Creates an instance of AgentGroup.
   * @param {string} _type - The type of the agent group.
   * @param {IndividualAgent[]} _listAgents - The list of individual agents in the group.
   */
  constructor(_type: string, _listAgents: IndividualAgent[]) {
    super(new GroupStrategyMovement(), _type);
    this.listAgents = _listAgents;
  }

  /**
   * Gets the list of individual agents in the group.
   * @returns {IndividualAgent[]}
   */
  public getListAgents(): IndividualAgent[] {
    return this.listAgents;
  }

  /**
   * Sets the list of individual agents in the group.
   * @param {IndividualAgent[]} value - The list of individual agents in the group.
   */
  public setListAgents(value: IndividualAgent[]) {
    this.listAgents = value;
  }

  /**
   * Defines the group's behavior given the list of agents.
   * @param {IndividualAgent[]} agents - The list of individual agents in the group.
   * @returns {void}
   */
  behave(agents: IndividualAgent[]): void {
    this.behavor.move(this, agents);
  }
}
