import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './App.css';
import UpperBox from "./UpperBox";
import LowerBox from "./LowerBox";

function App() {
  const [waypoints, setWaypoints] = useState([]);
  console.log(waypoints)
  return (
    <div className="App">
        <h4>Waypoints</h4>
        <div className={ 'columns' }>
            <div className={ 'row' }>
                <span>Description</span>
                <span>Distance from previous</span>
                <span>Distance remaining</span>
            </div>
                {
                    [0, 1, 2, 3, 4].map(i =>
                        <div className={ 'row' }>
                            <TextField
                                key={ i }
                                    onChange={ e => {
                                        const description = e.target.value;
                                        waypoints[i] ? waypoints[i].description = description : waypoints[i] = { description };
                                        setWaypoints(waypoints);
                                    } }
                            />

                            <TextField
                                key={ i }
                                onChange={ e => {
                                    const distanceFromPrevious = e.target.value;
                                    waypoints[i] ? waypoints[i].distanceFromPrevious = distanceFromPrevious : waypoints[i] = { distanceFromPrevious };
                                    setWaypoints(waypoints);
                                } }
                            />

                            <TextField
                                key={ i }
                                onChange={ e => {
                                    const distanceRemaining = e.target.value;
                                    waypoints[i] ? waypoints[i].distanceRemaining = distanceRemaining : waypoints[i] = { distanceRemaining };
                                    setWaypoints(waypoints);
                                } }
                            />
                        </div>
                    )
                }
        </div>
        <UpperBox className={ 'gridSeparator' } waypoints={ waypoints }></UpperBox>
        <LowerBox/>
    </div>
  );
}

export default App;
