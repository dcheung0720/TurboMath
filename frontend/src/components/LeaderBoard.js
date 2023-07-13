import FlipMove from 'react-flip-move';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

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
                    // key required for react to differentiate items in a list                 
                    <tr key={player[0]}>
                      <th scope="row">{index + 1} &nbsp;
                      {/* gold silver and bronze trophies */}
                      {index == 0 ?<FontAwesomeIcon icon={faTrophy} style={{color: "#fdec08",}} /> :
                       index == 1? <FontAwesomeIcon icon={faTrophy} style={{color: "#C0C0C0",}} /> :
                       index == 2? <FontAwesomeIcon icon={faTrophy} style={{color: "#CD7F32",}}/>: <></>}</th>
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
