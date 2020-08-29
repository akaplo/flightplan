import React, { useState } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import './App.css';
import UpperBox, {upperBoxHeaders} from "./UpperBox";
import LowerBox from "./LowerBox";
import ActionsBar from "./ActionsBar";
import {computeRowCellValues, computeTotalCellValue} from "./computeFuncs";
import { calculateLowerBoxCellValues, moveItemInArray, reverseFlightPlan} from "./utils";
import OriginDestinationRow from "./OriginDestinationRow";
import {generateFile} from "./fileUtils";
import * as pymToBIDFakeData from './mockdata/pym_bid';
import { ThemeProvider } from '@material-ui/core/styles';
import { defaultLightTheme } from "./themes";

const emptyLeg = { magVariance: 14 };

const App = () => {
    const [actionBarVisible, setActionBarVisible] = useState(true);
    const [checkpoints, setCheckpoints] = useState([{}]);
    const [destination, setDestination] = useState('');
    const [origin, setOrigin] = useState('');
    const [takeoffTimeEst, setTakeoffTimeEst] = useState(null);
    const [takeoffTimeAct, setTakeoffTimeAct] = useState(null);
    const [legs, setLegs] = useState([emptyLeg]);
    const [cruiseAlt, setCruiseAlt] = useState('');
    const [cruiseKTAS, setCruiseKTAS] = useState('');
    const [showRowEditor, setShowRowEditor] = useState(false)
    const [frequencies, setFrequencies] = useState({});

  return (
      <ThemeProvider theme={ defaultLightTheme }>
          <MuiPickersUtilsProvider utils={ MomentUtils }>
            <div className="App">
                <div className={ 'planWrapper'}>
                    <UpperBox
                        className={ 'gridSeparator' }
                        cruiseAlt={ cruiseAlt }
                        cruiseKTAS={ cruiseKTAS }
                        legs={ legs }
                        moveRow={ (oldIndex, newIndex) => {
                            setLegs(oldLegs => [ ...moveItemInArray(oldLegs, oldIndex, newIndex) ]);
                        } }
                        setCruiseAlt={ setCruiseAlt }
                        setCruiseKTAS={ setCruiseKTAS }
                        setLegs={ (legs) => {
                            const newLegs = computeRowCellValues(upperBoxHeaders, legs);
                            setLegs(newLegs);
                        } }
                        showRowEditor={ showRowEditor }
                        removeRow={ index => setLegs(l => [...l.slice(0, index), ...l.slice(index + 1)]) }
                    />
                    <OriginDestinationRow
                        destination={ destination }
                        origin={ origin }
                        setDestination={ setDestination}
                        setOrigin={ setOrigin }
                        takeoffTimeAct={ takeoffTimeAct }
                        setTakeoffTimeAct={ setTakeoffTimeAct }
                        takeoffTimeEst={ takeoffTimeEst }
                        setTakeoffTimeEst={ setTakeoffTimeEst }
                    />
                    <LowerBox
                        checkpoints={ checkpoints }
                        frequencies={ frequencies }
                        moveRow={ (oldIndex, newIndex) => {
                            setCheckpoints(oldCheckpoints => [ ...moveItemInArray(oldCheckpoints, oldIndex, newIndex) ]);
                        } }
                        removeRow={ index => setCheckpoints(c => [...c.slice(0, index), ...c.slice(index + 1)]) }
                        setCheckpoints={ (c) => setCheckpoints(calculateLowerBoxCellValues(c, legs)) }
                        setFrequencies={ f => setFrequencies(oldFreqs => ({ ...oldFreqs, ...f })) }
                        showRowEditor={ showRowEditor }
                        totalMiles={ 2 }
                    />
                </div>
                {
                    actionBarVisible && <ActionsBar
                        addEmptyCheckpoint={ () => setCheckpoints([ ...checkpoints, []]) }
                        addEmptyLeg={ () => setLegs(computeRowCellValues(upperBoxHeaders, [ ...legs, emptyLeg])) }
                        generateFile={ () => generateFile(cruiseAlt, cruiseKTAS, legs, checkpoints, [], [], origin, destination) }
                        loadFakeData={ () => {
                            setLegs(computeRowCellValues(upperBoxHeaders, pymToBIDFakeData.legs));
                            setCheckpoints(calculateLowerBoxCellValues(pymToBIDFakeData.checkpoints, pymToBIDFakeData.legs));
                            setDestination(pymToBIDFakeData.destination);
                            setOrigin(pymToBIDFakeData.origin);
                            setTakeoffTimeEst(pymToBIDFakeData.takeoffTimeEst);
                            setFrequencies(pymToBIDFakeData.frequencies);
                        }}
                        loadFlightPlan={ ({ cruiseAltitude, cruiseKTAS, legs, checkpoints, frequencies, notes, origin, destination }) => {
                            setCruiseAlt(cruiseAltitude);
                            setCruiseKTAS(cruiseKTAS);
                            setLegs(legs);
                            setCheckpoints(checkpoints);
                            setOrigin(origin);
                            setDestination(destination);
                        } }
                        showCheckpointEditor={ () => setShowRowEditor(oldVal => !oldVal) }
                        checkpointEditorVisible={ showRowEditor }
                        reverseFlightPlan={ () => {
                            const reversed = reverseFlightPlan(legs, checkpoints, frequencies, origin, destination);
                            setFrequencies(reversed.frequencies);
                            setCheckpoints(reversed.checkpoints);
                            setLegs(computeRowCellValues(upperBoxHeaders, (reversed.legs)));
                            setOrigin(reversed.origin);
                            setDestination(reversed.destination);
                            setCruiseAlt('');
                            setCruiseKTAS('');
                            setTakeoffTimeAct(null);
                            setTakeoffTimeEst(null);
                        } }
                        setActionBarVisible={ setActionBarVisible }
                    />
                }
            </div>
          </MuiPickersUtilsProvider>
      </ThemeProvider>
);
}

export default App;
