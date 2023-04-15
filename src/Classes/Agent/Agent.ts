import { StrategyMovement } from "../strategyMovement/StrategyMovement";
import { IndividualAgent } from "./IndividualAgent";

export abstract class Agent {

    protected type: string;

    protected behavor: StrategyMovement;

    public constructor(_behavor: StrategyMovement, _type: string) {
        this.behavor = _behavor;
        this.type = _type;
    }

    getType(): string {
        return this.type;
    }

    setType(_type: string): void {
        this.type = _type;
    }

    public abstract behave(agents : IndividualAgent[]): void;
}