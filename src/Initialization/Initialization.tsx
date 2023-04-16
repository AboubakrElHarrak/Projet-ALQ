import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Agent {
  x: number;
  y: number;
  intelligence: number;
}

interface IndividualAgent extends Agent {
  type: "Individual";
}

interface GroupAgent extends Agent {
  type: "Group";
}

type AgentType = IndividualAgent | GroupAgent;

const initialFormState: {
  agentType: "rock" | "paper" | "scissors";
  numAgents: number;
  agents: Agent[];
} = {
  agentType: "rock",
  numAgents: 0,
  agents: [],
};

const ModalComponent: React.FC<Props> = ({ show, onHide }) => {
  const [formState, setFormState] = useState(initialFormState);

  const handleAgentTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormState({
      ...formState,
      agentType: event.target.value as "rock" | "paper" | "scissors",
    });
  };

  const handleNumAgentsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numAgents = parseInt(event.target.value);
    const agents: Agent[] = [];
    for (let i = 0; i < numAgents; i++) {
      agents.push({ x: 0, y: 0, intelligence: 0 });
    }
    setFormState({
      ...formState,
      numAgents,
      agents,
    });
  };

  const handleAgentChange = (
    index: number,
    field: keyof Agent,
    value: number
  ) => {
    const agents = [...formState.agents];
    agents[index] = {
      ...agents[index],
      [field]: value,
    };
    setFormState({
      ...formState,
      agents,
    });
  };

  const handleCreateAgents = (agentType: AgentType["type"]) => {
    const agents = formState.agents.map((agent) => ({
      ...agent,
      type: agentType,
    }));
    if (agentType === "Individual") {
      console.log("Creating individual agents:", agents);
    } else {
      console.log(
        "Creating group agents with size:",
        formState.numAgents,
        "and agents:",
        agents
      );
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title
          style={{ color: "rgba(0, 99, 132, 0.5)", fontWeight: "bold" }}
        >
          Initialization phase
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label className="my-2">Choose agent type</Form.Label>
            <div>
              <Form.Check
                inline
                label="Rock"
                type="radio"
                value="rock"
                checked={formState.agentType === "rock"}
                onChange={handleAgentTypeChange}
              />
              <Form.Check
                inline
                label="Paper"
                type="radio"
                value="paper"
                checked={formState.agentType === "paper"}
                onChange={handleAgentTypeChange}
              />
              <Form.Check
                inline
                label="Scissors"
                type="radio"
                value="scissors"
                checked={formState.agentType === "scissors"}
                onChange={handleAgentTypeChange}
              />
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label className="my-2">Number of agents</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={formState.numAgents}
              onChange={handleNumAgentsChange}
            />
          </Form.Group>

          {formState.agents.map((agent, index) => (
            <Form.Group key={index}>
              <div className="row my-2">
                <div className="col">
                  <Form.Label>X</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    max={19}
                    value={agent.x}
                    onChange={(event) =>
                      handleAgentChange(
                        index,
                        "x",
                        parseInt(event.target.value)
                      )
                    }
                  />
                </div>
                <div className="col">
                  <Form.Label>Y</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    max={19}
                    value={agent.y}
                    onChange={(event) =>
                      handleAgentChange(
                        index,
                        "y",
                        parseInt(event.target.value)
                      )
                    }
                  />
                </div>
                <div className="col">
                  <Form.Label>Intelligence</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    value={agent.intelligence}
                    onChange={(event) =>
                      handleAgentChange(
                        index,
                        "intelligence",
                        parseInt(event.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          style={{
            backgroundColor: "rgba(0, 99, 132, 0.5)",
            borderColor: "rgba(0, 99, 132, 0.5)",
          }}
        >
          Create individual agents
        </Button>
        <Button
          style={{
            backgroundColor: "rgba(0, 99, 132, 0.5)",
            borderColor: "rgba(0, 99, 132, 0.5)",
          }}
        >
          Create group agents
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
