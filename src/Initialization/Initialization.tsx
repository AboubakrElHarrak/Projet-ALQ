import { useContext, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { SimulationContext } from "../AgentsContext/SimulationContext";
import { IndividualAgent } from "../Classes/Agent/IndividualAgent";
import { AgentGroup } from "../Classes/Agent/AgentGroup";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Agent {
  x: number;
  y: number;
  intelligence: number;
}

interface t_IndividualAgent extends Agent {
  type: "Individual";
}

interface t_GroupAgent extends Agent {
  type: "Group";
}

type AgentType = t_IndividualAgent | t_GroupAgent;

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
  const [simulation, setSimulation] = useContext(SimulationContext);

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
      agents.push({ x: 0, y: 0, intelligence: 1 });
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

  const handleCreateAgents = (agentCreationType: AgentType["type"]) => {
    if (formState.numAgents > 0) {
        const agents = formState.agents.map((agent) => ({
      ...agent,
      type: formState.agentType,
    }));
    if (agentCreationType === "Individual") {
        console.log("Creating individual agents:", agents);
        setSimulation(
            {
                ...simulation,
                agents: [...simulation.agents , ...agents.map(
                    agent => {
                        return new IndividualAgent(agent.type, agent.x, agent.y, agent.intelligence);
                    }
                )]
            }
        );

    } else {
        console.log("Creating group agents with size:", formState.numAgents, "and agents:", agents);
        let groupAgents : AgentGroup = new AgentGroup(
            formState.agentType,
            agents.map(
                agent => {
                    return new IndividualAgent(agent.type, agent.x, agent.y, agent.intelligence);
                }
            )
        );

        groupAgents.behave(simulation.agents);
        setSimulation(
            {
                ...simulation,
                agents: [...simulation.agents, ...groupAgents.getListAgents()]
            }
        );
    }
    }
    };
    

    const StartSimulation = () => {
        if (simulation.agents.length > 0) {
            onHide();
            setSimulation(
                {...simulation, simulationStarted:true}
            )
        }
    }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
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
                    min={1}          
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
        <Button variant="secondary" onClick={() => {StartSimulation()}}>
          Start
        </Button>
        <Button
          style={{
            backgroundColor: "rgba(0, 99, 132, 0.5)",
            borderColor: "rgba(0, 99, 132, 0.5)",
                  }}
                  
            onClick={(e) => handleCreateAgents("Individual")}
        >
          Create individual agents
        </Button>
        <Button
          style={{
            backgroundColor: "rgba(0, 99, 132, 0.5)",
            borderColor: "rgba(0, 99, 132, 0.5)",
                  }}
                  onClick={ (e) => handleCreateAgents("Group")}
        >
          Create group agents
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
