import React, { useState } from 'react';

const AnswerSubmit = ({number1, number2, setNumber1, setNumber2}) => {
  const [formData, setFormData] = useState({
    ans: null,
    number1: number1,
    number2: number2
  });

  //vis is true after one response
  const [feedbackVis, setFeedbackVis] = useState(false);

  //correct or not

  const [correct, setCorrect] = useState(false); 

  const handleChange = (e) => {
    setFormData({ans: e.target.value,
                number1: number1,
                number2: number2
                }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send form data to the Flask backend
    fetch('http://localhost:5000/submit', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the response from the Flask backend
        console.log(data);

        // clear form data
        setFormData({
            ans : '',
            number1: formData.number1,
            number2: formData.number2
        })

        // if answer is correct we give them a new problem and tell them they are correct.
        setFeedbackVis(true);
        if(data.correct == "True"){
            setCorrect(true)
            // new numbers in 1 second
            setTimeout(()=>{
                setNumber1(Math.floor(Math.random() * 12 + 1));
                setNumber2(Math.floor(Math.random() * 12 + 1));
                setFeedbackVis(false)
            }, 1000)

        }
        else{
            setCorrect(false)
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <>
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Answer:</label>
        <input
            type="ans"
            name="ans"
            id="ans"
            value={formData.ans}
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
