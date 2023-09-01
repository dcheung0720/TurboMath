import ActivityCalendar from "react-activity-calendar";
import { useData } from "../utilities/firebase";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";

const GameHistory = () =>{

    const {id} = useParams();

    const [userGames, error] = useData(`Users/${id}/Games`);

    const [userGamedates, setUserGameDates] = useState([]);

    const [activityData, setActivityData] = useState([]);

    // when the userGames data are fetched, set the dates data
    useEffect(()=>{
        if(userGames){
            setUserGameDates(userGames.map(x=>{
                    if(x.DateTime){
                        const date = new Date(x.DateTime);
                        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                    }
                })
            )
        }
    },[userGames])

    //when the dates data are processed, create the data for activity calendar
    useEffect(()=>{
        if(userGamedates){
            // query all thes dates and group data of the user
            // for every date in dates, count the number of dates equal to itself after filtering dups
            const datesWithCounts = userGamedates.filter((date, index) => userGamedates.indexOf(date) === index)
                                         .map(date => [date, userGamedates.reduce((acc, cur) => cur === date? acc + 1: acc, 0)]);

            let activityDataHolder = [];
            //loop through all dates in 2023
            for(let d = new Date(2023,0, 1); d < new Date(2023, 11, 31); d.setDate(d.getDate() + 1)){
                const tempDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
                
                //see if there is any data for the user at this date
                const dateMatch = datesWithCounts.filter(dateCounts => dateCounts[0] === tempDate);

                // need 0 padding for activity calendar dates, BRUH
                const activityDate = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${(d.getDate()).toString().padStart(2, '0')}`; 

                

                if(dateMatch.length === 1){
                    activityDataHolder.push({
                        count: dateMatch[1],
                        date: activityDate,
                        level: dateMatch[1] >= 5? 5: dateMatch[1]  
                    })
                }
                else{
                    activityDataHolder.push({
                        count: 0,
                        date: activityDate,
                        level: 0 
                    })
                }
            }

            setActivityData(activityDataHolder);
        }
    }, [userGamedates])

    console.log(activityData)

    return (
        <ActivityCalendar
            data = {activityData}
            labels={{
            legend: {
                less: "Less",
                more: "More"
            },
            months: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],
            totalCount: "{{count}} contributions in {{year}}",
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            }}
        />
        );
};

export default GameHistory;