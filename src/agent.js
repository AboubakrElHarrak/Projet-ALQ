class Agent {
  constructor(type, x, y, intelligence=1) { //niveaux : 1, 2, 3
    this.type = type;
    this.x = x;
    this.y = y;
    this.intelligence = intelligence;
  }

  updatePosition(agents) {
    
    //random
    const dx = Math.floor(Math.random() * 3) - 1; // random x direction (-1, 0, 1)
    const dy = Math.floor(Math.random() * 3) - 1; // random y direction (-1, 0, 1)
    const x = Math.min(Math.max(this.x + dx, 0), 19); // limit x position to [0, 19]
    const y = Math.min(Math.max(this.y + dy, 0), 19); // limit y position to [0, 19]

    //intelligent
    

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

  calculateNextPosition(agents) {
    

    const voisinage = [];
    const tableau_adjacent = [];
    const agents_adjacents = [];

    for (let i = -this.intelligence; i <= this.intelligence; i++) {
      for (let j = -this.intelligence; j <= this.intelligence; j++) {
        let tempX = this.x + i;
        let tempY = this.y + j;
        
        if ((tempX !== this.x || tempY !== this.y) && (tempX >= 0 && tempX <= 19) && (tempY >=0 && tempY <= 19)) {
          voisinage.push({ x: tempX, y: tempY });
        }
      }
    }

    if (this.intelligence === 1) {
      voisinage.forEach(position => tableau_adjacent.push(position));
    } else {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let tempX = this.x + i;
          let tempY = this.y + j;
          
          if ((tempX !== this.x || tempY !== this.y) && (tempX >= 0 && tempX <= 19) && (tempY >=0 && tempY <= 19)) {
            tableau_adjacent.push({ x: tempX, y: tempY });
          }
        }
      }
    }

    agents.forEach(agent => {
      voisinage.forEach(position => {
        if (agent.x === position.x && agent.y === position.y) {
          agents_adjacents.push(agent);
        }
      })
    });

    var nextPosition;
    
    if (agents_adjacents.length > 0) {
      nextPosition = { x: agents_adjacents[0].x - (this.intelligence - 1), y: agents_adjacents[0].y - (this.intelligence - 1)};

      tableau_adjacent.forEach(position => {
        if (
          Math.sqrt(
            Math.pow((position.x - agents_adjacents[0].x), 2) + Math.pow((position.y - agents_adjacents[0].y), 2)
          )

          >=

          Math.sqrt(
            Math.pow((nextPosition.x - agents_adjacents[0].x), 2) + Math.pow((nextPosition.y - agents_adjacents[0].y), 2)
          )
        )

        {
          nextPosition = {x: position.x, y: position.y}
        }
      });
    }


    
    //const output = 'next Position ' + this.x + ' ' + this.y + ' -> ' + this.x + ' ' + this.y;
    
    console.log(voisinage);
    console.log(tableau_adjacent);
    console.log(agents_adjacents);
    console.log(nextPosition);
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
