import { IndividualStrategyMovement } from "../strategyMovement/IndividualStrategyMovement";
import { Agent } from "./Agent";

export class IndividualAgent extends Agent {

    private x : number;
    private y : number;
    private intelligence: number;
    
    constructor(_x: number, _y: number, _type: string, _intellegence: number) {
        super(new IndividualStrategyMovement(), _type);
        this.x = _x;
        this.y = _y;
        this.intelligence = _intellegence;
    }

    getIntelligence(): number {
        return this.intelligence;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    setX(_x: number): void {
        this.x = _x;
    }
    
    setY(_y: number): void {
        this.y = _y;
    }

    behave(agents : IndividualAgent[]): void {
        this.behavor.move(this, agents);
    }
    
}