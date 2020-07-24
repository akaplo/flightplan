import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './App.css';
import UpperBox from "./UpperBox";
import LowerBox from "./LowerBox";
import ActionsBar from "./ActionsBar";

const App = () => {
    const [checkpoints, setCheckpoints] = useState([
        { description: 'Passing EWB aprt 9pm 2mi. Bogs off right 2-5im', distPtToPt: 17, distRemaining: 40, timeElapsedEst: 12, timeArrivedEst: '12:42', remarks: 'I dunno'},
        { description: 'Over fall river', distPtToPt: 12, distRemaining: 28, timeElapsedEst: 18, timeArrivedEst: '1:00', remarks: 'I still dunno'}
    ]);
    const [legs, setLegs] = useState([
        { name: 'KPYM -> Pt Judith', windHdg: 120, windSpd: 12, trueCourse: 200, magVariance: 14, magCourse: 214, windCrctAngle: 1, groundSpeed: 95, distance: 45, fuelStartTakeoff: 1.1, fuelClimb: 2, fuelCruise: 7, fuelExtra: 0, fuelTotal: 10.1 },
        { name: 'Pt Judith -> KBID', windHdg: 130, windSpd: 10, trueCourse: 180, magVariance: 14, magCourse: 194, windCrctAngle: 3, groundSpeed: 98, distance: 13, fuelStartTakeoff: 0, fuelClimb: 0, fuelCruise: .6, fuelExtra: 4, fuelTotal: 4.6 }
    ]);
    const [showRowEditor, setShowRowEditor] = useState(false)
  return (
        <div className="App">
            <div className={ 'planWrapper'}>
                <UpperBox
                    className={ 'gridSeparator' }
                    legs={ legs }
                    setLegs={ setLegs }
                    showRowEditor={ showRowEditor }
                    removeRow={ index => setLegs(l => [...l.slice(0, index), ...l.slice(index + 1)]) }
                />
                <LowerBox
                    checkpoints={ checkpoints }
                    setCheckpoints={ setCheckpoints }
                    showRowEditor={ showRowEditor }
                    removeRow={ index => setCheckpoints(c => [...c.slice(0, index), ...c.slice(index + 1)]) }
                />
            </div>
            <ActionsBar
                addEmptyCheckpoint={ () => setCheckpoints([ ...checkpoints, []]) }
                showCheckpointEditor={ () => setShowRowEditor(oldVal => !oldVal) }
                checkpointEditorVisible={ showRowEditor }
            />
        </div>
);
}

export default App;
