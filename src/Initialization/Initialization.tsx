import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface Agent {
  x: number;
  y: number;
  intelligence: number;
  action: string;
}

enum AgentType {
  Individual = "individual",
  Group = "group",
}

enum ActionType {
  Rock = "rock",
  Paper = "paper",
  Scissors = "scissors",
}

const MyModal: React.FC = () => {
  const [show, setShow] = useState(false);
  const [agentType, setAgentType] = useState<AgentType | null>(null);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [numAgents, setNumAgents] = useState<number>(0);
  const [agents, setAgents] = useState<Agent[]>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleActionTypeClick = (actionType: ActionType) => {
    setActionType(actionType);
  };

  const handleNumAgentsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumAgents(parseInt(event.target.value));
  };

  const handleCreateAgentsClick = () => {
    const newAgents: Agent[] = [];
    for (let i = 0; i < numAgents; i++) {
      newAgents.push({
        x: 0,
        y: 0,
        intelligence: 0,
        action: actionType as string,
      });
    }
    setAgents(newAgents);
  };

  const handleAgentTypeClick = (agentType: AgentType) => {
    setAgentType(agentType);
  };

  const handleAgentInputChange = (
    index: number,
    field: keyof Agent,
    value: number
  ) => {
    setAgents((prevAgents) =>
      prevAgents.map((agent, i) =>
        i === index ? { ...agent, [field]: value } : agent
      )
    );
  };

  const handleCreateIndividualAgents = () => {
    const individualAgents = agents.map((agent) => {
      return {
        ...agent,
        type: AgentType.Individual,
      };
    });
    console.log(individualAgents);
    handleClose();
  };

  const handleCreateGroupAgents = () => {
    const groupAgents = {
      type: AgentType.Group,
      agents: agents,
    };
    console.log(groupAgents);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create agents
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create agents</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {agentType === null && (
            <>
              <h4>Select an agent type:</h4>
              <Button
                variant="secondary"
                onClick={() => handleAgentTypeClick(AgentType.Individual)}
              >
                Individual
              </Button>{" "}
              <Button
                variant="secondary"
                onClick={() => handleAgentTypeClick(AgentType.Group)}
              >
                Group
              </Button>
            </>
          )}

          {agentType === AgentType.Individual && actionType === null && (
            <>
              <h4>Select an action type:</h4>
              <Button
                variant="secondary"
                onClick={() => handleActionTypeClick(ActionType.Rock)}
              >
                Rock
              </Button>{" "}
              <Button
                variant="secondary"
                onClick={() => handleActionTypeClick(ActionType.Paper)}
              >
                Paper
              </Button>{" "}
              <Button
                variant="secondary"
                onClick={() => handleActionTypeClick(ActionType.Scissors)}
              >
                Scissors
              </Button>
            </>
          )}

          {agentType === AgentType.Individual && actionType !== null && (
            <>
              <h4>Enter the number of agents:</h4>
              <input type="number" onChange={handleNumAgentsChange} />

              <h4>Enter agent details:</h4>
              {agents.map((agent, index) => (
                <div key={index}>
                  <label>
                    Agent {index + 1} - X:
                    <input
                      type="number"
                      value={agent.x}
                      onChange={(event) =>
                        handleAgentInputChange(
                          index,
                          "x",
                          parseInt(event.target.value)
                        )
                      }
                    />
                  </label>
                  <label>
                    Y:
                    <input
                      type="number"
                      value={agent.y}
                      onChange={(event) =>
                        handleAgentInputChange(
                          index,
                          "y",
                          parseInt(event.target.value)
                        )
                      }
                    />
                  </label>
                  <label>
                    Intelligence:
                    <input
                      type="number"
                      value={agent.intelligence}
                      onChange={(event) =>
                        handleAgentInputChange(
                          index,
                          "intelligence",
                          parseInt(event.target.value)
                        )
                      }
                    />
                  </label>
                </div>
              ))}

              <Button variant="primary" onClick={handleCreateAgentsClick}>
                Create agents
              </Button>
            </>
          )}

          {agentType === AgentType.Group && (
            <>
              <h4>Enter the number of agents:</h4>
              <input type="number" onChange={handleNumAgentsChange} />

              <h4>Enter agent details:</h4>
              {agents.map((agent, index) => (
                <div key={index}>
                  <label>
                    Agent {index + 1} - X:
                    <input
                      type="number"
                      value={agent.x}
                      onChange={(event) =>
                        handleAgentInputChange(
                          index,
                          "x",
                          parseInt(event.target.value)
                        )
                      }
                    />
                  </label>
                  <label>
                    Y:
                    <input
                      type="number"
                      value={agent.y}
                      onChange={(event) =>
                        handleAgentInputChange(
                          index,
                          "y",
                          parseInt(event.target.value)
                        )
                      }
                    />
                  </label>
                  <label>
                    Intelligence:
                    <input
                      type="number"
                      value={agent.intelligence}
                      onChange={(event) =>
                        handleAgentInputChange(
                          index,
                          "intelligence",
                          parseInt(event.target.value)
                        )
                      }
                    />
                  </label>
                </div>
              ))}

              <Button variant="primary" onClick={handleCreateGroupAgents}>
                Create group agents
              </Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyModal;
