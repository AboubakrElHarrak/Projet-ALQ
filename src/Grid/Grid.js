import "./Grid.css";

export const Grid = ({ grid, agents }) => {
  return (
    <div className="grid">
      {grid.map((row, i) =>
        row.map((col, j) => (
          <div
            key={`${i}-${j}`}
            className={`grid-item ${agents[col] ? agents[col].type : ""}`}
          >
            {agents
              .filter((agent) => agent.x === i && agent.y === j)
              .map((agent, k) => (
                <img
                  key={k}
                  src={getImageSource(agent.type)}
                  alt={agent.type}
                  className="agent"
                />
              ))}
          </div>
        ))
      )}
    </div>
  );
};

export function getImageSource(type) {
  switch (type) {
    case "rock":
      return "rock.svg";
    case "paper":
      return "paper.svg";
    case "scissors":
      return "scissors.svg";
    default:
      return "";
  }
}
