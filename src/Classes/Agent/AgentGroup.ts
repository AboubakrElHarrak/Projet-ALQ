import { GroupStrategyMovement } from "../strategyMovement/GroupStrategyMovement";
import { Agent } from "./Agent";
import { IndividualAgent } from "./IndividualAgent";

export class AgentGroup extends Agent {

    private listAgents: IndividualAgent[];    

    constructor(_type: string, _listAgents: IndividualAgent[]) {
        super(new GroupStrategyMovement(), _type);
        this.listAgents = _listAgents;
    }

    public getListAgents(): IndividualAgent[] {
        return this.listAgents;
    }

    public setListAgents(value: IndividualAgent[]) {
        this.listAgents = value;
    }

    behave(agents : IndividualAgent[]): void {
        this.behavor.move(this, agents);
    }
    
}