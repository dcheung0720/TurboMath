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
    min,
    easeLinear
  } from "d3";

import { useParams } from 'react-router';
import { useData } from '../utilities/firebase';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

const ProfileGraph = () =>{

    const svgRef = useRef();

    const {id} = useParams();

    const [gameData, error] = useData(`Users/${id}/Games`)

    const [selectedDifficulty, setSelectedDifficulty] = useState("1x1");

    const [selectedGameType, setSelectedGameType] = useState("Multiplication");

    const [svgSize, setSVGSize] = useState(0);


    useEffect(()=>{
        const getSVGSize = () =>{
            const svg = select(svgRef.current);
            if(svg){
                const svgRect = svg["_groups"][0][0].getBoundingClientRect();
                setSVGSize(svgRect);
            }
        }

        window.addEventListener("resize", getSVGSize);

        return(() => {
            window.removeEventListener('resize', getSVGSize);
        })
    }, [svgSize])

    // when data loads
    useEffect(() => {
        if(gameData){

            const getFullDate = (date)=>{
                return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`
            }
            
            // get all games with selected Difficulty and GameType 
            let data = gameData.filter(game =>
                game.GameType === selectedGameType &&
                game.Difficulty === selectedDifficulty &&
                game.PlayerMode === "Solo"
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

            let dateAndError = uniqueDates.map(date =>{
                const gamesWithDate = data.filter(game => getFullDate(new Date(game.DateTime)) === date);
                const errorCount = gamesWithDate.reduce((acc, cur) => acc += cur.WrongQuestions? Object.keys(cur.WrongQuestions).length : 0, 0);
                return [date, gamesWithDate.length > 0? errorCount/ gamesWithDate.length : 0]
            })


            const svg = select(svgRef.current);
            const margin = { top: 20, right: 20, bottom: 30, left: 40 };
            const svgRect = svg["_groups"][0][0].getBoundingClientRect();
            const width = svgRect.width - margin.left - margin.right;
            const height = svgRect.height - margin.top - margin.bottom;
    
            // Clear existing content
            svg.selectAll("*").remove();
            // Create a group for the chart content
            const chart = svg
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

            // Adding legend
            const legend = svg
            .append("g")
            .attr("class", "legend")
            .attr("transform", `translate(${margin.right + 50}, ${margin.top})`);

            const legendData = [
                { label: "Average Score", color: "#00bfa6" },
                { label: "Average #Error", color: "#880808" },
                // Add more categories as needed
            ];
            
            const legendItems = legend.selectAll(".legend-item")
            .data(legendData)
            .enter().append("g")
                .attr("class", "legend-item")
                .attr("transform", (d, i) => `translate(0,${i * 20})`); // Adjust spacing as needed

            legendItems.append("rect")
                .attr("width", 15)
                .attr("height", 15)
                .attr("fill", d => d.color);

            legendItems.append("text")
                .attr("x", 20)
                .attr("y", 10)
                .attr("dy", "0.35em")
                .text(d => d.label);

            if(dateAndScores.length > 0){
                // Scales
                const xScale = scaleBand()
                .domain(dateAndScores.map(d => d[0]))
                .range([0, width])
                .padding(0.1); // Adjust padding between bars if needed

                const yScale = scaleLinear()
                .domain([0, Math.max(max(dateAndScores, d => d[1]), max(dateAndError, d => d[1]))])
                .nice()
                .range([height, 0]);

                // Axes
                const xAxis = axisBottom(xScale);
                chart
                .append("g")
                .attr("class", "x-axis")
                .attr("transform", `translate(0, ${height})`)
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
                .style("font-family", "Bangers")
                .call(yAxis);

                // y label
                chart.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("y", 6)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .text("Average");

                // Add dots for data points
                chart.selectAll(".dot")
                .data(dateAndScores)
                .enter().append("circle")
                .transition() // Apply the transition
                .duration(1000) // Set the transition duration in milliseconds
                .attr("class", "dot")
                .attr("cx", d => xScale(d[0]) + xScale.bandwidth() / 2) // Center the dots on bars
                .attr("cy", d => yScale(d[1]))
                .attr("r", 4) // Adjust the radius of the dots as needed
                .attr("fill", "#00bfa6")


                // Add dots for errors
                chart.selectAll(".dot")
                .data(dateAndError)
                .enter().append("circle")
                .transition()
                .duration(1000)
                .attr("class", "dot")
                .attr("cx", d => xScale(d[0]) + xScale.bandwidth()/2)
                .attr("cy", d => yScale(d[1]))
                .attr("r", 4)
                .attr("fill", "#880808")

                // Drawing the line for average score
                const dataLine = line()
                .x(d => xScale(d[0]) + xScale.bandwidth() / 2) // Center the line on bars
                .y(d => yScale(d[1]));

                const dataPath = chart
                .append("path")
                .datum(dateAndScores)
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", "#00bfa6")
                .attr("d", dataLine); // Initial path

                // Calculate the total length of the path
                let totalLength = dataPath.node().getTotalLength();

                // Apply CSS to create the drawing animation
                dataPath
                .attr("stroke-dasharray", totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                .duration(1000)
                .ease(easeLinear)
                .attr("stroke-dashoffset", 0); // Draw the line


                // Drawing the error for the average error
                const errorLine = line()
                .x(d => xScale(d[0]) + xScale.bandwidth()/2)
                .y(d => yScale(d[1]));

                const errorPath = chart
                .append("path")
                .datum(dateAndError)
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", "#880808")
                .attr("d", errorLine);

                totalLength = errorPath.node().getTotalLength();

                errorPath
                .attr("stroke-dasharray", totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                .duration(1000)
                .ease(easeLinear)
                .attr("stroke-dashoffset", 0);

            }
            else{
                chart.append("text")
                .attr("class", "No Data")
                .attr("text-anchor", "middle")
                .attr("x", width / 2)
                .attr("y", height/2)
                .attr("transform", `translate(-50%, -50%)`)
                .style("font-size", "50px")
                .text("No Data");
            }

        }     
      }, [gameData, selectedDifficulty, selectedGameType, svgSize]);


    
    const handleSelectDifficulty = (ekey) =>{
        setSelectedDifficulty(ekey);
    }

    const handleSelectGameType = (ekey) =>{
        setSelectedGameType(ekey);
    }

    return(
        <Card style={{ width: '100%', height: "100%", display:"flex", justifyContent: "center"}}>
           <Card.Body style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems: "center"}}>
                <div style = {{display: "flex", justifyContent: "center"}}>
                    <Card.Title className = "graph-title">Average Over Time (solo mode) <FontAwesomeIcon icon={faArrowTrendUp} style={{color: "#2ac048",}} /> </Card.Title>
                        <DropdownButton
                                as={ButtonGroup}
                                size="sm"
                                variant="secondary"
                                title= {`Difficulty : ${selectedDifficulty}`}
                                style={{textAlign:"center", position: 'absolute', top: "3px", right: "3px"}}
                                onSelect={(ekey) => handleSelectDifficulty(ekey)}
                                >
                                <Dropdown.Item eventKey="1x1" className="text-center">1x1</Dropdown.Item>
                                <Dropdown.Item eventKey="2x1" className="text-center">2x1</Dropdown.Item>
                                <Dropdown.Item eventKey="3x1" className="text-center">3x1</Dropdown.Item>
                                <Dropdown.Item eventKey="2x2" className="text-center">2x2</Dropdown.Item>
                                <Dropdown.Item eventKey="3x2" className="text-center">3x2</Dropdown.Item>
                                <Dropdown.Item eventKey="3x3" className="text-center">3x3</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton
                                as={ButtonGroup}
                                size="sm"
                                variant="secondary"
                                title= {`GameType: ${selectedGameType}`}
                                style={{textAlign:"center", position: 'absolute', top: "3px", left: "3px"}}
                                onSelect={(ekey) => handleSelectGameType(ekey)}
                                >
                                <Dropdown.Item eventKey="Addition" className="text-center">Addition</Dropdown.Item>
                                <Dropdown.Item eventKey="Subtraction" className="text-center">Subtraction</Dropdown.Item>
                                <Dropdown.Item eventKey="Multiplication" className="text-center">Multiplication</Dropdown.Item>
                                <Dropdown.Item eventKey="Division" className="text-center">Division</Dropdown.Item>
                        </DropdownButton>
               </div>
               <svg width={"100%"} height={250} ref = {svgRef}>

               </svg>
           </Card.Body>
       </Card>)
};


export default ProfileGraph;