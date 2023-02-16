export const Grid = ({props}) => {

    const { grid, agents } = props;

    return (
      <div className="grid">
        {grid.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <div key={j} className="cell">
                {agents
                  .filter(agent => agent.x === i && agent.y === j)
                  .map((agent, k) => (
                    <img
                      key={k}
                      src={getImageSource(agent.type)}
                      alt={agent.type}
                      className="agent"
                    />
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
}