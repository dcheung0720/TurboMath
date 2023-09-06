import React, { useEffect, useRef, useState } from 'react';
import { setData, useData, useUserState } from '../utilities/firebase';
import { useParams } from 'react-router-dom';
import "./AnswerSubmission.css"

// Sound
// https://mixkit.co/free-sound-effects/game-show/

const AnswerSubmit = ({number1, number2, difficulty1, difficulty2, wrongQuestions, setWrongQuestions}) => {
  // get the current route id
  const {id} = useParams();

  const [formData, setFormData] = useState(" ");

  //vis is true after one response
  const [feedbackVis, setFeedbackVis] = useState(false);

  //correct or not
  const [correct, setCorrect] = useState(false); 

  //can submit? to prevent multiple submit
  const [canSubmit, setCanSubmit] = useState(true);
  const inputRef = useRef(null); // Initialize inputRef

  //get user
  const [user] = useUserState();

  //get room data
  const [room, error2] = useData(`GameRooms/${id}`)

  const scorePath = `GameRooms/${id}/Players/${user.uid}/score`

  //get current score
  const [score, error] = useData(scorePath);
  

  const handleChange = (e) => {
    setFormData(e.target.value);
  };


  const isCorrect = (formData) =>{
      if (room){
        switch(room.GameType){
          case "Addition":
            return parseInt(formData) === number1 + number2;
          case "Subtraction":
            return parseInt(formData) === number1 - number2;
          case "Multiplication":
            return parseInt(formData) === number1 * number2;
          case "Division":
            return parseInt(formData) === number1 / number2;
        }
      }
      
  };

  useEffect(()=>{
    // focus on the input when cansubmit changes
    inputRef.current.focus();
  }, [canSubmit])

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData("");
    setFeedbackVis(true);

    //if correct
    if(isCorrect(formData)){
      //play correct sound 
      playAudio("correct");
      
      //set correct to true
      setCorrect(true);
      setData(scorePath, score + 1);

      const nums = handleProblemGeneration(difficulty1, difficulty2);
      setCanSubmit(false);

      setTimeout(()=>{
        setData(`GameRooms/${id}/Problems/number1`, nums[0]);
        setData(`GameRooms/${id}/Problems/number2`, nums[1]);
        setFeedbackVis(false);
        setCanSubmit(true);
      }, 1000)
    }
    else{
      //play incorrect sound 
      playAudio("incorrect");
      setCorrect(false);

      //add to the list of wrongly answered questions
      const wrongID = Object.entries(wrongQuestions).length;
      
      //const object construction
      const wrongObject = {
        number1: room.Problems.number1,
        number2: room.Problems.number2
      }

      wrongQuestions[wrongID] = wrongObject

      console.log(wrongQuestions);
      setWrongQuestions(wrongQuestions);
    }
  };


  const handleProblemGeneration = (numDigits1, numDigits2) =>{
      let nums = []
      if (room){
        let num1;
        let num2;
        switch(room.GameType){  
          case "Addition":
            num1 = GenerateNumbers(numDigits1);
            num2 = GenerateNumbers(numDigits2);

            break;
          case "Subtraction":
            num1 = GenerateNumbers(numDigits1);
            num2 = GenerateNumbers(numDigits2);

            //swap to ensure the first number is bigger
            if(num1 < num2){
              let temp = num1;
              num1 = num2;
              num2 = temp;
            }

            break;

          case "Multiplication":
            num1 = GenerateNumbers(numDigits1);
            num2 = GenerateNumbers(numDigits2);

            break;

          case "Division":
            //convert from float to int
            numDigits1 = parseInt(numDigits1);
            numDigits2 = parseInt(numDigits2);
            let smallestDig = numDigits1 < numDigits2? numDigits1 : numDigits2;
            let biggestDig = numDigits1 > numDigits2? numDigits1 : numDigits2;

            let numSmall = GenerateNumbers(""+smallestDig);

            let randFactor;
            switch(biggestDig){
              case 1:
                randFactor = Math.floor(Math.random() * 9/numSmall + 1);
                break;
              case 2:
                randFactor = Math.floor(Math.random() * 99/numSmall + 11/numSmall);
                break;
              case 3:
                randFactor = Math.floor(Math.random() * 999/numSmall + 101/numSmall);
                break;
            }
            let numBig = randFactor * numSmall;
            num1 = numBig;
            num2 = numSmall;
            
        }
        nums.push(num1);
        nums.push(num2);
        return nums;
      }
      


  }

  const GenerateNumbers = (numDigits) =>{
    switch(numDigits){
        case "1":
            return Math.floor(Math.random() * 9 + 1);
        case "2":
            return Math.floor(Math.random() * 90 + 10);   
        case "3":        
            return Math.floor(Math.random() * 900 + 100);       
    }
};


  //play audio
  const playAudio = (id) =>{
    //get correct audio element and play the sound
    document.getElementById(id).play();
  }

  return (
    <div>
      <div className="container">
        {/* audio player */}

        {/* correct sound */}
        <audio id = "correct" controls autoplay hidden>
            <source src="../audio/correct.wav" type="audio/wav"></source>
          Your browser does not support the audio element.
        </audio>

        {/* incorrect sound */}
        <audio id = "incorrect" controls autoplay hidden>
            <source src="../audio/wrong.wav" type="audio/wav"></source>
          Your browser does not support the audio element.
        </audio>

        {/* form to handle submit */}
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text bg-primary text-white" id="inputGroup-sizing-default">Answer</span>
            </div>
            {/* input group for answer submission */}
            <input ref = {inputRef} disabled = {!canSubmit} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={formData}
              onChange={handleChange} placeholder='Input Your Answer Here'/>
            <button type="submit" className="btn btn-primary answer-submit">Submit</button>
          </div>
        </form>
        {feedbackVis? (correct ? <div className = "feedback"> Good Job! You got it correct!</div> : <div className = "feedback"> Not Quite... You got it wrong!</div>) : <></> }
      </div>
    </div>
  );
}

export default AnswerSubmit;
