import { GroupStrategyMovement } from "../strategyMovement/GroupStrategyMovement";
import { Agent } from "./Agent";
import { IndividualAgent } from "./IndividualAgent";

class AgentGroup extends Agent {

    private listAgents: IndividualAgent[];

    constructor(_type: string, _listAgents: IndividualAgent[]) {
        super(new GroupStrategyMovement(), _type);
        this.listAgents = _listAgents;
    }

    behave(agents : IndividualAgent[]): void {

    }
    
}