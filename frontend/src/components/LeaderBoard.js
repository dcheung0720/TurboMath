import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './LeaderBoard.css'; // Import CSS file for animations

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
          <TransitionGroup component={null}>
            {Object.entries(room.Players)
              .sort((a, b) => b[1].score - a[1].score)
              .map((player, index) => (
                <CSSTransition
                    key={player[0]}
                    timeout={500} // Animation duration
                    className = "leaderboard"
                    >                   
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{player[1].name}</td>
                    <td>{player[1].score}</td>
                  </tr>
                </CSSTransition>
              ))}
          </TransitionGroup>
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
