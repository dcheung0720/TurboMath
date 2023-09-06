import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useData } from '../utilities/firebase';
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faFire } from '@fortawesome/free-solid-svg-icons';
import "./ProfileStats.css"
import { useRef } from 'react';
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
    easeLinear,
    csvFormat,
    scaleOrdinal,
    transition
  } from "d3";

const ProfileStats = () =>{

    const {id} = useParams();

    const [userData, error] = useData(`Users/${id}`);

    const gameMode = ["Addition", "Subtraction", "Multiplication", "Division"];

    const [selectedDifficulty, setSelectedDifficulty] = useState("1x1");

    const svgRef = useRef();

    const [svgSize, setSVGSize] = useState(0);

    const handleSelectDifficulty = (eKey) =>{
        setSelectedDifficulty(eKey);
    };

    // window resizing
    useEffect(() =>{
        const getSVGSize = () =>{
            const svg = select(svgRef.current);
            if(svg){
                const svgRect = svg["_groups"][0][0].getBoundingClientRect();
                setSVGSize(svgRect);
            }
        }

        window.addEventListener("resize", getSVGSize);

        return(()=> window.removeEventListener("resize", getSVGSize));

    }, [svgSize])

    useEffect(()=>{

        if(userData){
            const x = ["Addition", "Subtraction", "Multiplication", "Division"];

            const y = x.map(gm => userData[gm]["Turbo"][selectedDifficulty].HS);

            const data = x.map((gm, i) => [gm, y[i]]);

            //get the SVG reference
            const svg = select(svgRef.current);

            const svgRect = svg["_groups"][0][0].getBoundingClientRect();

            const margin = {top: 40, right: 30, bottom: 20,  left : 40 };

            const width =  svgRect.width - margin.left - margin.right;

            const height = svgRect.height - margin.top - margin.bottom;

            svg.selectAll("*").remove();

            // append the group for the bar graph.
            let chart = svg
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})` )

            const xScale = scaleBand().domain(x).range([0, width]).padding(.5);

            const yScale = scaleLinear().domain([0, max(y)]).nice().range([height, 0]);

            const customColors = ['#FF5733', '#33FF57', '#337FFF', '#FF33E1'];
            const colorScale = scaleOrdinal().range(customColors);

            //draw bar x axis
            chart
            .append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${height})`)
            .style("font-family", "Bangers")
            .call(axisBottom(xScale));

            //draw bar y axis
            chart.
            append("g")
            .attr("class", "y-axis")
            .style("font-family", "Bangers")
            .call(axisLeft(yScale));

            const bars = chart
            .selectAll('.bar')
            .data(data);

            bars
            .enter()
            .append("rect")
            .transition() // Add transition for enter selection
            .duration(1000) // Duration of the animation in milliseconds
            .attr("class", "bar")
            .attr("x", (d) => xScale(d[0]))
            .attr("y", (d) => yScale(d[1]))
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - yScale(d[1])})
            .attr('fill', (d, i) => colorScale(i)); // Assign a color based on the index or data value
                        
        }

    }, [userData, selectedDifficulty, svgSize])

    return(
     <Card className = "profile-stats">
        <Card.Body >
            <div className = "header" style = {{display: "flex", justifyContent:"space-between", alignItems: "center" }}>
                <div style={{ flex: 1, textAlign: "center" }}>
                    <Card.Title style={{marginBottom: "5px"}}>Personal High Scores <FontAwesomeIcon icon={faFire} style={{color: "#ff0000"}} /></Card.Title>
                </div>
                <span className = "selection">
                    <DropdownButton  key="secondary" 
                    id="dropdown-variants-Secondary" 
                    size="sm"
                    title= {`Difficulty: ${selectedDifficulty}`}
                    style ={{margin:"5px"}}
                    onSelect = {(eKey) => handleSelectDifficulty(eKey)}
                    >
                        <Dropdown.Item href="#/action-1" className = "text-center" eventKey="1x1">1 x 1</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" className = "text-center" eventKey="2x1">2 x 1</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" className = "text-center" eventKey="3x1">3 x 1</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" className = "text-center" eventKey="2x2">2 x 2</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" className = "text-center" eventKey="3x2">3 x 2</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" className = "text-center" eventKey="3x3">3 x 3</Dropdown.Item>
                    </DropdownButton>
                </span>
            </div>
            <svg ref = {svgRef} width = {"100%"} height = {250}>

            </svg>
        </Card.Body>
    </Card>)

};


export default ProfileStats;