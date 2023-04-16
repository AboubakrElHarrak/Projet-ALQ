import { IndividualStrategyMovement } from "../strategyMovement/IndividualStrategyMovement";
import { Agent } from "./Agent";

/**
 * This class represents an individual agent in the environment.
 * It extends the Agent class.
 */
export class IndividualAgent extends Agent {
  private x: number;
  private y: number;
  private intelligence: number;
  private isInGroup: boolean;

  /**
   * Creates a new instance of the IndividualAgent class.
   * @param _type The type of the agent.
   * @param _x The x-coordinate of the agent.
   * @param _y The y-coordinate of the agent.
   * @param _intelligence The intelligence of the agent. Default value is 1.
   * @param _isInGroup Specifies whether the agent is in a group. Default value is false.
   */
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

  /**
   * Gets the intelligence of the agent.
   * @returns The intelligence of the agent.
   */
  getIntelligence(): number {
    return this.intelligence;
  }

  /**
   * Gets the x-coordinate of the agent.
   * @returns The x-coordinate of the agent.
   */
  getX(): number {
    return this.x;
  }

  /**
   * Gets the y-coordinate of the agent.
   * @returns The y-coordinate of the agent.
   */
  getY(): number {
    return this.y;
  }

  /**
   * Gets whether the agent is in a group.
   * @returns Whether the agent is in a group.
   */
  getIsInGroup(): boolean {
    return this.isInGroup;
  }

  /**
   * Sets the x-coordinate of the agent.
   * @param _x The new x-coordinate of the agent.
   */
  setX(_x: number): void {
    this.x = _x;
  }

  /**
   * Sets the y-coordinate of the agent.
   * @param _y The new y-coordinate of the agent.
   */
  setY(_y: number): void {
    this.y = _y;
  }

  /**
   * Sets whether the agent is in a group.
   * @param _isInGroup Whether the agent is in a group.
   */
  setIsInGroup(_isInGroup: boolean) {
    this.isInGroup = _isInGroup;
  }

  /**
   * Implements the behave method of the Agent class.
   * Moves the agent using its behavior strategy.
   * @param agents The list of agents in the environment.
   */
  behave(agents: IndividualAgent[]): void {
    this.behavor.move(this, agents);
  }
}
