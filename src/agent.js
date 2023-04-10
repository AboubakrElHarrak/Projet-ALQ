class Agent {
  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
  }

  updatePosition(agents) {
    const dx = Math.floor(Math.random() * 3) - 1; // random x direction (-1, 0, 1)
    const dy = Math.floor(Math.random() * 3) - 1; // random y direction (-1, 0, 1)
    const x = Math.min(Math.max(this.x + dx, 0), 19); // limit x position to [0, 19]
    const y = Math.min(Math.max(this.y + dy, 0), 19); // limit y position to [0, 19]

    // collision detection
    const collidingAgent = agents.find(
      (a) => a.x === x && a.y === y && a !== this
    );
    if (collidingAgent) {
      if (collidingAgent.type === this.type) {
        // same type, keep moving randomly
        this.x = x;
        this.y = y;
      } else {
        // different type, determine winner based on rock-paper-scissors rules
        const winnerType = getWinnerType(this.type, collidingAgent.type);
        const newType =
          this.type === winnerType ? this.type : collidingAgent.type;
        this.x = x;
        this.y = y;
        this.type = newType;
      }
    } else {
      this.x = x;
      this.y = y;
    }
  }
}

function getWinnerType(type1, type2) {
  if (type1 === type2) {
    return type1;
  }
  if (
    (type1 === "rock" && type2 === "scissors") ||
    (type1 === "scissors" && type2 === "paper") ||
    (type1 === "paper" && type2 === "rock")
  ) {
    return type1;
  }
  return type2;
}

export default Agent;
