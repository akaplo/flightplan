import React, { Fragment, useState } from 'react';
import './Plan.css';
import {HalfHeightHeader, NormalHeightHeader, TwoCellsWithHeader} from "./UpperBox";

function LowerBox({ className, checkpoints, origin, destination, legs, takeoffTimeEst, }) {
    console.log(checkpoints)
    const lowerBoxHeaders = [
        {text: 'Checkpoints', loc: `span 4 / 5`, val: 'checkpoint'},
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
        </div>
    );
}

LowerBox.defaultProps = {
    legs: [
        { name: 'KPYM -> Pt Judith', windHdg: 120, windSpd: 12, trueCourse: 200, magVariance: '14', magCourse: '214', windCrctAngle: '1', magHdg: '215', groundSpeed: 95, distance: 45, time: 35, fuelStartTakeoff: 1.1, fuelClimb: 2, fuelCruise: 7, fuelExtra: 0, fuelTotal: 10.1 },
        { name: 'Pt Judith -> KBID', windHdg: 130, windSpd: 10, trueCourse: 180, magVariance: '14', magCourse: '194', windCrctAngle: '3', magHdg: '197', groundSpeed: 98, distance: 13, time: 8, fuelStartTakeoff: 0, fuelClimb: 0, fuelCruise: .6, fuelExtra: 4, fuelTotal: 4.6 }
    ],
    takeoffTimeEst: '12:30pm',
    origin: 'Plymouth, MA (PYM)',
    destination: 'BLock Island, RI (KBID)'
};

export default LowerBox;
