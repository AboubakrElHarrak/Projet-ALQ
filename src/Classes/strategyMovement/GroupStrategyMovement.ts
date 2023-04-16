import { AgentGroup } from "../Agent/AgentGroup";
import { IndividualAgent } from "../Agent/IndividualAgent";
import { StrategyMovement } from "./StrategyMovement";

export class GroupStrategyMovement implements StrategyMovement {
    
    move(agentGroup :AgentGroup): void {
        let agentGroupList : IndividualAgent[] = agentGroup.getListAgents();
        
        //console.log("grouup");

        agentGroupList.forEach((agent : IndividualAgent) => {
            agent.setIsInGroup(true);
        })

        agentGroup.setListAgents(agentGroupList);
    }
    
}