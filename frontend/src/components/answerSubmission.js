import React, { useState } from 'react';
import { setData, useData, useUserState } from '../utilities/firebase';

const AnswerSubmit = ({number1, number2}) => {

  const [formData, setFormData] = useState(null);

  //vis is true after one response
  const [feedbackVis, setFeedbackVis] = useState(false);

  //correct or not
  const [correct, setCorrect] = useState(false); 

  //get user
  const [user] = useUserState();

  const scorePath = `GameRooms/id/Players/${user.uid}/`
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
        setData(`GameRooms/id/Problems/number1`, Math.floor(Math.random() * 12));
        setData(`GameRooms/id/Problems/number2`, Math.floor(Math.random() * 12));
        setFeedbackVis(false);
      }, 1000)
    }
    else{
      setCorrect(false);
    }


  };

  return (
    <>
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Answer:</label>
        <input
            type="ans"
            name="ans"
            id="ans"
            value={formData}
            onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
        </form>
        {feedbackVis? (correct ? <div> Good Job! You got it correct!</div> : <div> Not Quite... You got it wrong!</div>) : <></> }
    </>
  );
}

export default AnswerSubmit;
