import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import rd3 from 'react-d3-library'
import { useRef,useEffect, useState } from 'react';
import {
    select,
    line,
    curveCardinal,
    scaleLinear,
    axisBottom,
    axisLeft,
  } from "d3";

import { useParams } from 'react-router';
import { useData } from '../utilities/firebase';

const ProfileGraph = () =>{

    const svgRef = useRef();

    const {id} = useParams();

    const [gameData, error] = useData(`Users/${id}/Games`)

    const [selectedDifficulty, setSelectedDifficulty] = useState("1x1");

    const [selectedGameType, setSelectedGameType] = useState("Multiplication")


    // when data loads
    useEffect(() => {
        if(gameData){

            const getFullDate = (date)=>{
                return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`
            }
            
            // get all games with selected Difficulty and GameType 
            let data = gameData.filter(game =>
                game.GameType === selectedGameType &&
                game.Difficulty === selectedDifficulty
            )
            
            let dates = data.map(game => {
                const date = new Date(game.DateTime);
                return getFullDate(date);
            });

            //x time scales
            let uniqueDates = dates.filter((date, idx) => dates.indexOf(date) === idx);

            // average score of each unque date
            let dateAndScores = uniqueDates.map(date =>{
                const gamesWithDate = data.filter(game => getFullDate(new Date(game.DateTime)) === date);

                const scoreCount = gamesWithDate.reduce((acc, cur) => acc += cur.Score, 0);
                
                return [date, gamesWithDate.length > 0? scoreCount/ gamesWithDate.length:0]
            })

            const svg = select(svgRef.current);
        
            //scales
            const xScale = scaleLinear()
            .domain([0, data.length - 1])
            .range([0, 300]);
        
            const yScale = scaleLinear().domain([0, 100]).range([100, 0]);
        
            //axes
            const xAxis = axisBottom(xScale).ticks(data.length);
            svg.select(".x-axis").style("transform", "translateY(100px)").call(xAxis);
        
            const yAxis = axisLeft(yScale);
            svg.select(".y-axis").style("transform", "translateX(0px)").call(yAxis);
        
            //line generator
            const myLine = line()
            .x((d, i) => xScale(i))
            .y((d) => yScale(d.y))
            .curve(curveCardinal);
        
            //drawing the line
            svg
            .selectAll(".line")
            .data([data])
            .join("path")
            .attr("class", "line")
            .attr("d", myLine)
            .attr("fill", "none")
            .attr("stroke", "#00bfa6");
        }
      }, [gameData]);

    return(
        <Card style={{ width: '47vw', height: "100%"}}>
           <Card.Body>
               <Card.Title>History</Card.Title>
               <svg ref = {svgRef}>

               </svg>

           </Card.Body>
       </Card>)
};


export default ProfileGraph;