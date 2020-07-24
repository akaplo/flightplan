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
    const [showCheckpointRowEditor, setShowCheckpointRowEditor] = useState(false)
  return (
        <div className="App">
            <div className={ 'planWrapper'}>
                <UpperBox className={ 'gridSeparator' }/>
                <LowerBox
                    checkpoints={ checkpoints }
                    setCheckpoints={ setCheckpoints }
                    showRowEditor={ showCheckpointRowEditor }
                    removeRow={ index => setCheckpoints(c => [...c.slice(0, index), ...c.slice(index + 1)]) }
                />
            </div>
            <ActionsBar
                addEmptyCheckpoint={ () => setCheckpoints([ ...checkpoints, []]) }
                showCheckpointEditor={ () => setShowCheckpointRowEditor(oldVal => !oldVal) }
                checkpointEditorVisible={ showCheckpointRowEditor }
            />
        </div>
);
}

export default App;
