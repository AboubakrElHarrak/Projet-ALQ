import { IndividualStrategyMovement } from "../strategyMovement/IndividualStrategyMovement";
import { Agent } from "./Agent";

export class IndividualAgent extends Agent {
  private x: number;
  private y: number;
  private intelligence: number;
  private isInGroup: boolean;

  constructor(
    _type: string,
    _x: number,
    _y: number,
    _intellegence: number = 1,
    _isInGroup: boolean = false
  ) {
    super(new IndividualStrategyMovement(), _type);
    this.x = _x;
    this.y = _y;
    this.intelligence = _intellegence;
    this.isInGroup = _isInGroup;
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

  getIsInGroup(): boolean {
    return this.isInGroup;
  }

  setX(_x: number): void {
    this.x = _x;
  }

  setY(_y: number): void {
    this.y = _y;
  }

  setIsInGroup(_isInGroup: boolean) {
    this.isInGroup = _isInGroup;
  }

  behave(agents: IndividualAgent[]): void {
    this.behavor.move(this, agents);
  }
}
