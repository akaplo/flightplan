import React, { Fragment, useState } from 'react';
import './Plan.css';

function Plan({ waypoints, origin, destination, legs }) {
    console.log(waypoints)
    const upperBoxHeaders = [
        { text: 'Leg Name', loc: `span 2 / 3`, val: 'name' },
        { text: 'Hdg', loc: 3, halfHeight: true, sectionName: 'Wind', val: 'windHdg' },
        { text: 'Spd', loc: 4, halfHeight: true, val: 'windSpd' },
        { text: 'True Course', loc: 5, val: 'trueCourse' },
        { text: '+w, -e', loc: 6, val: 'magVariance' },
        { text: 'Mag Course', loc: 7, val: 'magCourse' },
        { text: '-L +R', loc: 8, val: 'windCrctAngle' },
        { text: 'Mag Hdg', loc: 9, val: 'magHdg' },
        { text: 'Ground V', loc: 10, val: 'groundSpeed' },
        { hasSum: true, text: 'Miles', loc: 11, val: 'distance' },
        { hasSum: true, text: 'Time', loc: 12, val: 'time' },
        { text: 'Start/Taxi/TkOff', loc: 13, halfHeight: true, val: 'fuelStartTakeoff' },
        { text: 'Climb', loc: 14, halfHeight: true, val: 'fuelClimb' },
        { text: 'Cruise', loc: 15, halfHeight: true, sectionName: 'Fuel', val: 'fuelCruise' },
        { text: 'Extra', loc: 16, halfHeight: true, val: 'fuelExtra' },
        { hasSum: true, text: 'Total', loc: 17, halfHeight: true, val: 'fuelTotal' },
    ];
    return (
        <div className={ 'upperBox' }>
            <div className={ 'topLeftText thickBorder cell'} style={ { gridRow: 1, gridColumn: 'span 7 / 8' } }>Cruise Altitude</div>
            <div className={ 'topLeftText thickBorder cell'} style={ { gridRow: 1, gridColumn: 'span 3 / 11' } }>Cruise KTAS</div>
            <div className={ 'topLeftText thickBorder cell'} style={ { gridRow: 1, gridColumn: 'span 7 / 18' } }>Heading</div>
            {
                upperBoxHeaders.map((header, idx) =>
                    <div style={ { gridRow: 2, gridColumn: header.loc } }>
                        { header.halfHeight &&
                            <div style={ { gridRow: 2, gridColumn: header.loc, height: '1rem', top: 0 } }>
                                { header.sectionName }
                            </div>
                        }
                            <div
                                className={ 'thickBorder centerText' }
                                style={ {
                                    height: header.halfHeight ? '1.5rem'  : '2.5rem',
                                } }
                            >
                                { header.text }
                            </div>
                    </div>
                )
            }
            {
                legs.map((leg, idx) =>
                    upperBoxHeaders.map(h =>
                        <div className={ 'normalBorder centerText cell' } style={ { gridRow: 3   + idx, gridColumn: h.loc, height: 'auto' } }>
                            { leg[h.val] || '---' }
                        </div>
                    )
                )
            }
            {
                upperBoxHeaders.map(header =>
                    header.hasSum && <div className={ 'normalBorder centerText cell boldText' } style={ { gridRow: 3 + legs.length, gridColumn: header.loc } }>
                        { legs.map(l => l[header.val]).reduce((accumulator, currentValue) => accumulator + currentValue) }
                    </div>
                )
            }
        </div>
    );
}
Plan.defaultProps = {
    legs: [
        { name: 'KPYM -> Pt Judith', windHdg: 120, windSpd: 12, trueCourse: 200, magVariance: '14', magCourse: '214', windCrctAngle: '1', magHdg: '215', groundSpeed: 95, distance: 45, time: 35, fuelStartTakeoff: 1.1, fuelClimb: 2, fuelCruise: 7, fuelExtra: 0, fuelTotal: 10.1 },
        { name: 'Pt Judith -> KBID', windHdg: 130, windSpd: 10, trueCourse: 180, magVariance: '14', magCourse: '194', windCrctAngle: '3', magHdg: '197', groundSpeed: 98, distance: 13, time: 8, fuelStartTakeoff: 0, fuelClimb: 0, fuelCruise: .6, fuelExtra: 4, fuelTotal: 4.6 }
    ]
};

export default Plan;
