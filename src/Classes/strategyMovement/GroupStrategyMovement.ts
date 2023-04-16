import { AgentGroup } from "../Agent/AgentGroup";
import { IndividualAgent } from "../Agent/IndividualAgent";
import { StrategyMovement } from "./StrategyMovement";

/**
 * Implements the StrategyMovement interface for moving a group of agents.
 * @implements {StrategyMovement}
 */
export class GroupStrategyMovement implements StrategyMovement {
  /**
   * Move the group of agents.
   * @param {AgentGroup} agentGroup - The group of agents to move.
   * @returns {void}
   */
  move(agentGroup: AgentGroup): void {
    let agentGroupList: IndividualAgent[] = agentGroup.getListAgents();

    agentGroupList.forEach((agent: IndividualAgent) => {
      agent.setIsInGroup(true);
    });

    agentGroup.setListAgents(agentGroupList);
  }
}
