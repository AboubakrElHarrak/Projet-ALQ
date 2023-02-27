import React, { useState, useEffect } from 'react';
import { Grid } from "./Grid/Grid";
import './App.css';

const GRID_SIZE = 20;
const AGENT_TYPES = ['rock', 'paper', 'scissors'];
const NUM_AGENTS = 10;
const NEIGHBORHOOD_RADIUS = 2;


function getNearbyAgents(agent, prevAgents) {
  const { x, y } = agent;
  const nearbyAgents = prevAgents.filter((a) => {
    // check if the agent is not itself
    if (a.id === agent.id) {
      return false;
    }

    // check if the agent is within the neighborhood
    const distance = Math.sqrt((a.x - x) ** 2 + (a.y - y) ** 2);
    if (distance <= NEIGHBORHOOD_RADIUS) {
      return true;
    }

    return false;
  });

  return nearbyAgents;
}


////////////////////

function getStrongerAgent(agent, nearbyAgents) {
  // Find the stronger agent among the nearby agents
  let strongerAgent = null;
  for (let nearbyAgent of nearbyAgents) {
    if (nearbyAgent.type === agent.type) {
      continue;
    }
    if (
      (agent.type === "rock" && nearbyAgent.type === "scissors") ||
      (agent.type === "scissors" && nearbyAgent.type === "paper") ||
      (agent.type === "paper" && nearbyAgent.type === "rock")
    ) {
      if (!strongerAgent || nearbyAgent.type === strongerAgent.type) {
        strongerAgent = nearbyAgent;
      } else {
        // There are two different stronger agents, so return null
        return null;
      }
    }
  }
  return strongerAgent;
}

///////////////////////////////////

function getWeakerAgent(agent, nearbyAgents) {
  const weakerAgents = nearbyAgents.filter(
    nearbyAgent => {
      if (nearbyAgent.type === agent.type) {
        return false;
      }

      if (agent.type === 'rock' && nearbyAgent.type === 'scissors') {
        return false;
      }

      if (agent.type === 'scissors' && nearbyAgent.type === 'paper') {
        return false;
      }

      if (agent.type === 'paper' && nearbyAgent.type === 'rock') {
        return false;
      }

      return true;
    }
  );

  if (weakerAgents.length === 0) {
    return null;
  }

  return weakerAgents.reduce((prev, current) => {
    if (prev.type === 'rock' && current.type === 'scissors') {
      return current;
    }

    if (prev.type === 'scissors' && current.type === 'paper') {
      return current;
    }

    if (prev.type === 'paper' && current.type === 'rock') {
      return current;
    }

    return prev;
  });
}

////////////////////////

function isStronger(type, otherType) {
  if (
    (type === 'rock' && otherType === 'scissors') ||
    (type === 'scissors' && otherType === 'paper') ||
    (type === 'paper' && otherType === 'rock')
  ) {
    return true;
  }
  return false;
}


/////////////////////////
function getDirectionAwayFrom(agent, weakerAgent) {
  const deltaX = agent.x - weakerAgent.x;
  const deltaY = agent.y - weakerAgent.y;
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);
  let directionX = deltaX === 0 ? 0 : (deltaX / absDeltaX);
  let directionY = deltaY === 0 ? 0 : (deltaY / absDeltaY);
  if (absDeltaX > absDeltaY) {
    directionY = 0;
  } else if (absDeltaY > absDeltaX) {
    directionX = 0;
  }
  return { x: directionX, y: directionY };
}

//////////////////////////////////

function getDirectionTowards(agent, otherAgent) {
  const diffX = otherAgent.x - agent.x;
  const diffY = otherAgent.y - agent.y;

  if (diffX === 0 && diffY === 0) {
    // If the agents are on the same cell, don't move
    return { x: 0, y: 0 };
  }

  // Move towards other agent
  const moveX = diffX > 0 ? 1 : diffX < 0 ? -1 : 0;
  const moveY = diffY > 0 ? 1 : diffY < 0 ? -1 : 0;

  return { x: moveX, y: moveY };
}
////////////////////////////////////////
function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}




////////////////////////////////////////////////////////////////
////////////////////////////////////////

function determineWinner(agent1, agent2) {
  if (isStronger(agent1.type, agent2.type)) {
    return agent1;
  } else if (isStronger(agent2.type, agent1.type)) {
    return agent2;
  } else {
    // If the types are the same, the winner is chosen randomly
    return Math.random() < 0.5 ? agent1 : agent2;
  }
}

///////////////////////////////////////

function getStrongerType(type1, type2) {
  if (type1 === type2) {
    return type1; // types are the same, so they cancel each other out
  }

  if (
    (type1 === "rock" && type2 === "scissors") ||
    (type1 === "paper" && type2 === "rock") ||
    (type1 === "scissors" && type2 === "paper")
  ) {
    return type1; // type1 wins
  } else {
    return type2; // type2 wins
  }
}





/////////////////////////////////////////////////////////////////////////////************************************************ */

function App() {
  const [agents, setAgents] = useState([]);
  const [grid, setGrid] = useState([]);

  useEffect(() => {
  // initialize grid
  const initialGrid = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => null)
  );

  // initialize agents
  const initialAgents = [];
  for (let i = 0; i < NUM_AGENTS; i++) {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    const type = AGENT_TYPES[Math.floor(Math.random() * AGENT_TYPES.length)];
    initialAgents.push({ id: i, x, y, type, direction: [1, 0] });
    initialGrid[x][y] = i;
  }

  setGrid(initialGrid);
  setAgents(initialAgents);
}, []);


  function updateAgents() {
  setAgents(prevAgents => {
    return prevAgents.map(agent => {
      // apply rule 2 first
      const nearbyAgents = getNearbyAgents(agent, prevAgents);
      const strongerAgent = getStrongerAgent(agent, nearbyAgents);
      const weakerAgent = getWeakerAgent(agent, nearbyAgents);
      if (weakerAgent) {
        if (isStronger(agent.type, weakerAgent.type)) {
          // move away from weaker agent
          const { x, y } = getDirectionAwayFrom(agent, weakerAgent);
          return { ...agent, x, y };
        } else {
          // move towards weaker agent
          const { x, y } = getDirectionTowards(agent, weakerAgent);
          return { ...agent, x, y };
        }
      } else if (strongerAgent) {
        // move away from stronger agent
        const { x, y } = getDirectionAwayFrom(agent, strongerAgent);
        return { ...agent, x, y };
      } else {
        // apply rule 1 if no nearby agents of different type
        let { x, y } = agent;
        if (x <= 0 || x >= GRID_SIZE - 1) {
          x = clamp(x, 1, GRID_SIZE - 2);
        }
        if (y <= 0 || y >= GRID_SIZE - 1) {
          y = clamp(y, 1, GRID_SIZE - 2);
        }
        return { ...agent, x, y };
      }
    });
  });
}


  function moveAgent(agent, agents, gridSize) {
  // Calculate the agent's new position based on its current position and velocity
  const newPosition = {
    x: agent.x + agent.velocity.x,
    y: agent.y + agent.velocity.y,
  };

  // If the agent is at the edge of the grid, reflect its velocity in the opposite direction
  if (newPosition.x === gridSize.width || newPosition.x === -1) {
    agent.velocity.x *= -1;
    newPosition.x = agent.x + agent.velocity.x;
  }
  if (newPosition.y === gridSize.height || newPosition.y === -1) {
    agent.velocity.y *= -1;
    newPosition.y = agent.y + agent.velocity.y;
  }

  // If the agent is going to move out of the grid, don't move it
  if (newPosition.x < 0 || newPosition.x >= gridSize.width || newPosition.y < 0 || newPosition.y >= gridSize.height) {
    return;
  }

  // Check if the agent will collide with another agent
  const collidedAgent = agents.find(a => a.x === newPosition.x && a.y === newPosition.y && a.id !== agent.id);

  if (collidedAgent) {
    // If the agent collided with another agent, determine the winner
    const winner = determineWinner(agent, collidedAgent);

    if (winner === agent) {
      // If this agent is the winner, change the type of the other agent to its type
      collidedAgent.type = agent.type;
    } else {
      // Otherwise, change this agent's type to the type of the other agent
      agent.type = collidedAgent.type;
    }

    // Move the agent in the opposite direction
    agent.velocity.x *= -1;
    agent.velocity.y *= -1;

    // Return early since we don't need to update the agent's position
    return;
  }

  // Update the agent's position
  agent.x = newPosition.x;
  agent.y = newPosition.y;
}


  function handleCollision(agent1, agent2) {
  const strongerType = getStrongerType(agent1.type, agent2.type);
  if (agent1.type === strongerType) {
    agent2.type = strongerType;
  } else {
    agent1.type = strongerType;
  }
}


  function handleOutOfBounds(agent) {
  const { x, y, dx, dy } = agent;
  const newX = x + dx;
  const newY = y + dy;

  if (newX < 0 || newX >= GRID_SIZE) {
    agent.dx = -dx;
  }

  if (newY < 0 || newY >= GRID_SIZE) {
    agent.dy = -dy;
  }
}


  return (
    <div className="App">
      <h1>Rock Paper Scissors</h1>
      <Grid grid={grid} agents={agents} />
    </div>
  );
}

export default App;
