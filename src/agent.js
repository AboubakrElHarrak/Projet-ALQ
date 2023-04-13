class Agent {
  constructor(type, x, y, intelligence=1) { //niveaux : 1, 2, 3
    this.type = type;
    this.x = x;
    this.y = y;
    this.intelligence = intelligence;
  }

  updatePosition(agents, x, y) {
    this.x = x;
    this.y = y;
    this.detectCollision(agents, x, y);
    
  }

  detectCollision(agents, x, y) {
    // collision detection
    const collidingAgent = agents.find(
      (a) => a.x === x && a.y === y && a !== this
    );
    if (collidingAgent) {
      if (collidingAgent.type !== this.type) {
        // different type, determine winner based on rock-paper-scissors rules
        const winnerType = getWinnerType(this.type, collidingAgent.type);
        const newType = this.type === winnerType ? this.type : collidingAgent.type;
        this.type = newType;
      } 
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
    
  //if agents_adjacents.length = 0 we choose the next position based on other rules (for example random movement)
    if (agents_adjacents.length > 0) {

      const tab_final_scores = [];

      tableau_adjacent.forEach(item => tab_final_scores.push({ position: item, finalScore: 0 }));

      for (let i = 0; i < agents_adjacents.length; i++) {

        const info_tableau_adjacent = [];


        tableau_adjacent.forEach(item => info_tableau_adjacent.push({ position: item, distance: 0, score: 0 }));
        
        nextPosition = { x: agents_adjacents[i].x - (this.intelligence - 1), y: agents_adjacents[i].y - (this.intelligence - 1) };

        info_tableau_adjacent.forEach(item => {
          
          //calculate distance between current item and current enemy agent
          item.distance = distance(item.position, agents_adjacents[i]);

        });
        
        //condition on agents_adjacents[i].type then sort array based on distance
        if (this.type === agents_adjacents[i].type) {
          //escape from other agent
          trier_cases_desc(info_tableau_adjacent);
        } else {
          if (getWinnerType(this.type, agents_adjacents[i].type) === this.type) {
            //get close to other agent
            trier_cases_asc(info_tableau_adjacent);
            
          } else {
            //escape from other agent
            trier_cases_desc(info_tableau_adjacent);
          }
        } 
        

        //assign scores
        for (let i = 0; i < info_tableau_adjacent.length; i++) {
              info_tableau_adjacent[i].score = i + 1;
        }

        //update final scores
        tab_final_scores.forEach(
          item => {
            info_tableau_adjacent.forEach(
              info => {
                if (info.position === item.position) {
                  item.finalScore += info.score;
                }
              }
            )
          }
        );
            
      }

      nextPosition = tab_final_scores.reduce((prev, curr) => prev.finalScore < curr.finalScore ? prev : curr).position;

      console.log("tab_final_scores : ");
      console.log(tab_final_scores);
      this.updatePosition(agents, nextPosition.x, nextPosition.y);
    }
    
    //random
    else {
      
      const dx = Math.floor(Math.random() * 3) - 1; // random x direction (-1, 0, 1)
      const dy = Math.floor(Math.random() * 3) - 1; // random y direction (-1, 0, 1)
      const x = Math.min(Math.max(this.x + dx, 0), 19); // limit x position to [0, 19]
      const y = Math.min(Math.max(this.y + dy, 0), 19); // limit y position to [0, 19]

      this.updatePosition(agents, x, y);
    }


    
    //const output = 'next Position ' + this.x + ' ' + this.y + ' -> ' + this.x + ' ' + this.y;
    
    console.log("voisinage : ");
    console.log(voisinage);

    console.log("tableau_adjacent : ");
    console.log(tableau_adjacent);

    console.log("agents_adjacents : ");
    console.log(agents_adjacents);

    console.log("nextPosition : ");
    console.log(nextPosition);
  }

}

function distance(position, position0) {
    return Math.sqrt(Math.pow((position.x - position0.x), 2) + Math.pow((position.y - position0.y), 2));
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

function trier_cases_desc(tab){
    var changed;
    do{
        changed = false;
        for(var i=0; i < tab.length-1; i++) {
            if(tab[i].distance < tab[i+1].distance) {
                var tmp = tab[i];
                tab[i] = tab[i+1];
                tab[i+1] = tmp;
                changed = true;
            }
        }
    } while(changed);
}

function trier_cases_asc(tab){
    var changed;
    do{
        changed = false;
        for(var i=0; i < tab.length-1; i++) {
            if(tab[i].distance > tab[i+1].distance) {
                var tmp = tab[i];
                tab[i] = tab[i+1];
                tab[i+1] = tmp;
                changed = true;
            }
        }
    } while(changed);
}

export default Agent;
