import React, { useState } from 'react';
import { setData, useData, useUserState } from '../utilities/firebase';
import { useParams } from 'react-router-dom';

const AnswerSubmit = ({number1, number2}) => {
  // get the current route id
  const {id} = useParams();

  const [formData, setFormData] = useState(" ");

  //vis is true after one response
  const [feedbackVis, setFeedbackVis] = useState(false);

  //correct or not
  const [correct, setCorrect] = useState(false); 

  //get user
  const [user] = useUserState();

  const scorePath = `GameRooms/${id}/Players/${user.uid}/score`
  //get current score
  const [score, error] = useData(scorePath)

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData("");
    setFeedbackVis(true);

    //if correct
    if(parseInt(formData) == number1 * number2 ){
      setCorrect(true);
      setData(scorePath, score + 1);

      setTimeout(()=>{
        setData(`GameRooms/${id}/Problems/number1`, Math.floor(Math.random() * 12));
        setData(`GameRooms/${id}/Problems/number2`, Math.floor(Math.random() * 12));
        setFeedbackVis(false);
      }, 1000)
    }
    else{
      setCorrect(false);
    }


  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text bg-primary text-white" id="inputGroup-sizing-default">Answer</span>
            </div>
            {/* input group for answer submission */}
            <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={formData}
              onChange={handleChange} placeholder='Input Your Answer Here'/>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
      {feedbackVis? (correct ? <div> Good Job! You got it correct!</div> : <div> Not Quite... You got it wrong!</div>) : <></> }
    </>
  );
}

export default AnswerSubmit;
