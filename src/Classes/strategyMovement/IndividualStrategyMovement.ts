import { IndividualAgent } from "../Agent/IndividualAgent";
import { StrategyMovement } from "./StrategyMovement";

type t_position = { x: number, y: number };
type t_final_score = { position: t_position, finalScore: number };
type t_info_tableau_adjacent = { position: t_position, distance: number, score: number };

export class IndividualStrategyMovement implements StrategyMovement{
    
    move(agent :IndividualAgent, agents : IndividualAgent[]): void {
        this.calculateNextPosition(agent, agents);
    }


    // utility functions --------------------------------------------------
    getWinnerType(type1 : string, type2 : string) {
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

    distance(position : t_position, position0 : IndividualAgent) {
        return Math.sqrt(Math.pow((position.x - position0.getX()), 2) + Math.pow((position.y - position0.getY()), 2));
    }

    trier_cases_desc(tab : t_info_tableau_adjacent[]){
        var changed : boolean;
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

    trier_cases_asc(tab : t_info_tableau_adjacent[]){
        var changed : boolean;
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
    //----------------------------------------------------------------------

    updatePosition(agent :IndividualAgent, agents : IndividualAgent[], x : number, y : number) {
    agent.setX(x);
    agent.setY(y);
    this.detectCollision(agent, agents, x, y);
    
  }

  detectCollision(agent :IndividualAgent, agents : IndividualAgent[], x : number, y : number) {
    // collision detection
    const collidingAgent = agents.find(
      (a) => a.getX() === x && a.getY() === y && a !== agent
    );
    if (collidingAgent) {
      if (collidingAgent.getType() !== agent.getType()) {
        // different type, determine winner based on rock-paper-scissors rules
        const winnerType = this.getWinnerType(agent.getType(), collidingAgent.getType());
        const newType = agent.getType() === winnerType ? agent.getType() : collidingAgent.getType();
        agent.setType(newType);
      } 
    }
  }


    calculateNextPosition(agent :IndividualAgent, agents : IndividualAgent[]) : void {
        
    

    const voisinage : t_position[] = [];
    const tableau_adjacent : t_position[]  = [];
    const agents_adjacents  : IndividualAgent[] = [];
        
        

    for (let i = -agent.getIntelligence(); i <= agent.getIntelligence(); i++) {
      for (let j = -agent.getIntelligence(); j <= agent.getIntelligence(); j++) {
        let tempX : number = agent.getX() + i;
        let tempY : number = agent.getY() + j;
        
        if ((tempX !== agent.getX() || tempY !== agent.getY()) && (tempX >= 0 && tempX <= 19) && (tempY >=0 && tempY <= 19)) {
          voisinage.push({ x: tempX, y: tempY });
        }
      }
    }

    if (agent.getIntelligence() === 1) {
      voisinage.forEach(position => tableau_adjacent.push(position));
    } else {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let tempX = agent.getX() + i;
          let tempY = agent.getY() + j;
          
          if ((tempX !== agent.getX() || tempY !== agent.getY()) && (tempX >= 0 && tempX <= 19) && (tempY >=0 && tempY <= 19)) {
            tableau_adjacent.push({ x: tempX, y: tempY });
          }
        }
      }
    }

    agents.forEach(__agent => {
      voisinage.forEach(position => {
        if (__agent.getX() === position.x && __agent.getY() === position.y) {
          agents_adjacents.push(__agent);
        }
      })
    });

    var nextPosition;
    
  //if agents_adjacents.length = 0 we choose the next position based on other rules (for example random movement)
    if (agents_adjacents.length > 0) {

      const tab_final_scores : t_final_score[] = [];

      tableau_adjacent.forEach(item => tab_final_scores.push({ position: item, finalScore: 0 }));

      for (let i = 0; i < agents_adjacents.length; i++) {

        const info_tableau_adjacent  : t_info_tableau_adjacent[] = [];


        tableau_adjacent.forEach(item => info_tableau_adjacent.push({ position: item, distance: 0, score: 0 }));
        
        nextPosition = { x: agents_adjacents[i].getX() - (agent.getIntelligence() - 1), y: agents_adjacents[i].getY() - (agent.getIntelligence() - 1) };

        info_tableau_adjacent.forEach(item => {
          
          //calculate distance between current item and current enemy agent
          item.distance = this.distance(item.position, agents_adjacents[i]);

        });
        
        
        //condition on agents_adjacents[i].type then sort array based on distance
        if (agent.getType() === agents_adjacents[i].getType()) {
          //escape from other agent
          this.trier_cases_desc(info_tableau_adjacent);
        } else {
          if (this.getWinnerType(agent.getType(), agents_adjacents[i].getType()) === agent.getType()) {
            //get close to other agent
            this.trier_cases_asc(info_tableau_adjacent);
            
          } else {
            //escape from other agent
            this.trier_cases_desc(info_tableau_adjacent);
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
      this.updatePosition(agent, agents, nextPosition.x, nextPosition.y);
    }
    
    //random
    else {
      
      const dx = Math.floor(Math.random() * 3) - 1; // random x direction (-1, 0, 1)
      const dy = Math.floor(Math.random() * 3) - 1; // random y direction (-1, 0, 1)
      const x = Math.min(Math.max(agent.getX() + dx, 0), 19); // limit x position to [0, 19]
      const y = Math.min(Math.max(agent.getY() + dy, 0), 19); // limit y position to [0, 19]

      this.updatePosition(agent, agents, x, y);
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