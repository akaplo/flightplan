import React, { Fragment, useState } from 'react';
import './Plan.css';
import TextField from "@material-ui/core/TextField";

import {HalfHeightHeader, NormalHeightHeader, TwoCellsWithHeader} from "./UpperBox";

function LowerBox({ className, origin, destination, legs, takeoffTimeEst, }) {
    const [focusedBox, setFocusedBox] = useState('');
    const [checkpoints, setCheckpoints] = useState([
        { description: 'Passing EWB aprt 9pm 2mi. Bogs off right 2-5im', distPtToPt: 17, distRemaining: 40, timeElapsedEst: 12, timeArrivedEst: '12:42', remarks: 'I dunno'},
        { description: 'Over fall river', distPtToPt: 12, distRemaining: 28, timeElapsedEst: 18, timeArrivedEst: '1:00', remarks: 'I still dunno'}
    ]);

    const lowerBoxHeaders = [
        {text: 'Checkpoints', loc: `span 4 / 5`, val: 'description'},
        { text: 'Pt to Pt', loc: 5, val: 'distPtToPt', sectionName: 'Distance', halfHeight: true },
        {text: 'Remaining', loc: 6, val: 'distRemaining', halfHeight: true },
        {text: 'Estimated', loc: 7, val: 'timeElapsedEst', sectionName: 'Elapsed Time', halfHeight: true },
        {text: 'Actual', loc: 8, val: 'timeElapsedAct', halfHeight: true },
        {text: 'Estimated', loc: 9, val: 'timeArrivedEst', sectionName: 'Arrival Time', halfHeight: true },
        {text: 'Actual', loc: 10, val: 'timeArrivedAct', halfHeight: true },
        {text: 'Remarks', loc: 'span 2 / 13', val: 'remarks' }
    ];
    return (
        <div className={ `lowerBox ${ className }` }>
            {
                lowerBoxHeaders.map(header =>
                    <div style={ { gridRow: 2, gridColumn: header.loc } }>
                        { header.halfHeight &&
                            <HalfHeightHeader sectionName={ header.sectionName } cellText={ header.text } gridColumn={ 4 } gridRow={ 2 }/>
                        }
                        { !header.halfHeight &&
                            <NormalHeightHeader text={ header.text } />
                        }
                    </div>
                )
            }
            {
                checkpoints.map((checkpt, idx) =>
                    lowerBoxHeaders.map(h =>
                        <Fragment>
                            {
                                focusedBox === `${ 3 + idx }/${ h.loc }` &&
                                    <TextField
                                        autoFocus
                                        color={ 'secondary' }
                                        onBlur={ (e) => {
                                            const newCheckpoints = checkpoints;
                                            newCheckpoints[idx][h.val] = e.target.value;
                                            setCheckpoints(newCheckpoints);
                                            setFocusedBox('')
                                        }}
                                        style={ { gridRow: 3 + idx, gridColumn: h.loc, height: 'auto' } }
                                        variant={ 'outlined' }
                                        defaultValue={ checkpoints[idx][h.val] }
                                    />
                            }
                            {
                                focusedBox !== `${ 3 + idx }/${ h.loc }` &&
                                <div className={ 'normalBorder centerText thickCell' }
                                     style={ { gridRow: 3 + idx, gridColumn: h.loc, height: 'auto' } }
                                     onClick={ () => setFocusedBox(`${3+idx}/${h.loc}`)}
                                >
                                    { checkpt[h.val] || '' }
                                </div>
                            }
                        </Fragment>
                    )
                )
            }
        </div>
    );
}

LowerBox.defaultProps = {
    checkpoints: [
        { description: 'Passing EWB aprt 9pm 2mi. Bogs off right 2-5im', distPtToPt: 17, distRemaining: 40, timeElapsedEst: 12, timeArrivedEst: '12:42', remarks: 'I dunno'},
        { description: 'Over fall river', distPtToPt: 12, distRemaining: 28, timeElapsedEst: 18, timeArrivedEst: '1:00', remarks: 'I still dunno'}
    ],
    takeoffTimeEst: '12:30pm',
    origin: 'Plymouth, MA (PYM)',
    destination: 'BLock Island, RI (KBID)'
};

export default LowerBox;