import FlipMove from 'react-flip-move';

const LeaderBoard = ({ room }) => {
  return (
    <div className="LeaderBoard">
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            <FlipMove typeName={null}>
              {Object.entries(room.Players)
                .sort((a, b) => b[1].score - a[1].score)
                .map((player, index) => (                  
                    <tr key={player[0]}>
                      <th scope="row">{index + 1}</th>
                      <td>{player[1].name}</td>
                      <td>{player[1].score}</td>
                    </tr>
                ))}
              </FlipMove>
          </tbody>
        </table>
    </div>
  );
};

export default LeaderBoard;
