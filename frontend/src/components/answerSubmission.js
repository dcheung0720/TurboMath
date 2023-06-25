import React, { useState } from 'react';
import { setData } from '../utilities/firebase';

const AnswerSubmit = ({number1, number2}) => {

  const [formData, setFormData] = useState(null);

  //vis is true after one response
  const [feedbackVis, setFeedbackVis] = useState(false);

  //correct or not
  const [correct, setCorrect] = useState(false); 

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(formData == number1 * number2 ){
      setCorrect(true);

      setTimeout(()=>{
        setData(`GameRooms/id/Problems/number1`, Math.floor(Math.random() * 12))
        setData(`GameRooms/id/Problems/number2`, Math.floor(Math.random() * 12))
      }, 1000)
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
