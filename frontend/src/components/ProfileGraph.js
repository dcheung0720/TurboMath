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
    scaleBand,
    max,
    min
  } from "d3";

import { useParams } from 'react-router';
import { useData } from '../utilities/firebase';

const ProfileGraph = () =>{

    const svgRef = useRef();

    const {id} = useParams();

    const [gameData, error] = useData(`Users/${id}/Games`)

    const [selectedDifficulty, setSelectedDifficulty] = useState("1x1");

    const [selectedGameType, setSelectedGameType] = useState("Multiplication");

    const [hoveredData, setHoveredData] = useState(null);

    // Define tooltip position and content
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const [tooltipContent, setTooltipContent] = useState('');

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
          
                // Scales
                const xScale = scaleBand()
                  .domain(dateAndScores.map(d => d[0]))
                  .range([0, width])
                  .padding(0.1); // Adjust padding between bars if needed
          
                const yScale = scaleLinear()
                  .domain([0, max(dateAndScores, d => d[1])])
                  .nice()
                  .range([height, 0]);
          
                // Axes
                const xAxis = axisBottom(xScale);
                chart
                  .append("g")
                  .attr("class", "x-axis")
                  .attr("transform", `translate(0, ${height})`)
                  .style("font-size","20px")
                  .style("font-family", "Bangers")
                  .call(xAxis);

                // x label
                chart.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "end")
                .attr("x", width)
                .attr("y", height - 6)
                .text("Date");
          
                const yAxis = axisLeft(yScale);
                chart
                  .append("g")
                  .attr("class", "y-axis")
                  .style("font-size","20px")
                  .style("font-family", "Bangers")
                  .call(yAxis);

                // y label
                chart.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("y", 6)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .text("Average Score");
          
                // Add dots for data points
                chart.selectAll(".dot")
                  .data(dateAndScores)
                  .enter().append("circle")
                  .attr("class", "dot")
                  .attr("cx", d => xScale(d[0]) + xScale.bandwidth() / 2) // Center the dots on bars
                  .attr("cy", d => yScale(d[1]))
                  .attr("r", 4) // Adjust the radius of the dots as needed
                  .on('mouseover', (event, d) => {
                    // Show a tooltip with the score when hovering over a dot
                    setHoveredData(d);
                    // Calculate the tooltip position relative to the chart container
                    const x = xScale(d[0]) + xScale.bandwidth() / 2;
                    const y = yScale(d[1]);
                    setTooltipPosition({ top: y, left: x });
                    setTooltipContent(`Average Score: ${d[1]}`);
                  })
                  .on('mouseout', () => {
                    // Hide the tooltip when mouseout
                    setHoveredData(null);
                  });
          
                // Line generator
                const myLine = line()
                  .x(d => xScale(d[0]) + xScale.bandwidth() / 2) // Center the line on bars
                  .y(d => yScale(d[1]));
          
                // Drawing the line
                chart
                  .append("path")
                  .datum(dateAndScores)
                  .attr("class", "line")
                  .attr("d", myLine)
                  .attr("fill", "none")
                  .attr("stroke", "#00bfa6");
        }
            }
            
      }, [gameData, selectedDifficulty, selectedGameType]);

    return(
        <Card style={{ width: '47vw', height: "100%"}}>
           <Card.Body>
               <Card.Title>Avevrage Score Over Time</Card.Title>
               <svg width={700} height={250} ref = {svgRef}
               transform={`translate(40, 20)`}
>

               </svg>
               {hoveredData && (
            <div
              className="tooltip"
              style={{
                position: 'absolute',
                top: `${tooltipPosition.top}px`,
                left: `${tooltipPosition.left}px`,
                backgroundColor: 'white',
                padding: '5px',
                borderRadius: '5px',
                boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.2)',
              }}
            >
              {tooltipContent}
            </div>
          )}
           </Card.Body>
       </Card>)
};


export default ProfileGraph;