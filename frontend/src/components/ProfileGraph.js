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
    scaleTime,
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

            console.log(dateAndScores)

            if (dateAndScores.length > 0){
                const svg = select(svgRef.current);
                const margin = { top: 20, right: 20, bottom: 30, left: 40 };
                const width = 700 - margin.left - margin.right;
                const height = 250 - margin.top - margin.bottom;

                // Clear existing content
                svg.selectAll("*").remove();
            
                // Create a group for the chart content
                const chart = svg
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

                //scales
                const xScale = scaleTime()
                .domain([new Date (dateAndScores[0][0]), new Date (dateAndScores[dateAndScores.length - 1][0])])
                .range([0, width]);

            
                const yScale = scaleLinear().domain([0, 10]).range([height, 0]);
            
                //axes
                const xAxis = axisBottom(xScale).ticks(5);
                chart
                .append("g")
                .attr("class", "x-axis")
                .attr("transform", `translate(0, ${height})`)
                .call(xAxis);
            
                const yAxis = axisLeft(yScale);
                chart
                .append("g")
                .attr("class", "y-axis")
                .call(yAxis);


                //line generator
                const myLine = line()
                .x((d) => xScale(new Date(d[0])))
                .y((d) => yScale(d[1]))
                .curve(curveCardinal);
            
                //drawing the line
                svg
                .selectAll(".line")
                .data([dateAndScores])
                .join("path")
                .attr("class", "line")
                .attr("d", myLine)
                .attr("fill", "none")
                .attr("stroke", "#00bfa6");
        }
            }
            
      }, [gameData]);

    return(
        <Card style={{ width: '47vw', height: "100%"}}>
           <Card.Body>
               <Card.Title>History</Card.Title>
               <svg width={700} height={250} ref = {svgRef} transform={`translate(40, 20)`}>
                
               </svg>
           </Card.Body>
       </Card>)
};


export default ProfileGraph;