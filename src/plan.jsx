import React, { Fragment, useState } from 'react';
import './Plan.css';

function Plan({ waypoints, origin, destination, legs }) {
    console.log(waypoints)
    const upperBoxHeaders = [
        { text: 'Leg Name', loc: `span 2 / 3` }, { text: 'Hdg', loc: 3, halfHeight: true, sectionName: 'Wind' },
        { text: 'Spd', loc: 4, halfHeight: true }, { text: 'True Course', loc: 5 },
        { text: '+w, -e', loc: 6 }, { text: 'Mag Course', loc: 7 },
        { text: '-L +R', loc: 8 }, { text: 'Mag Hdg', loc: 9 },
        { text: 'Ground V', loc: 10 }, { text: 'Miles', loc: 11 },
        { text: 'Time', loc: 12 }, { text: 'Start/Taxi/TkOff', loc: 13, halfHeight: true },
        { text: 'Climb', loc: 14, halfHeight: true }, { text: 'Cruise', loc: 15, halfHeight: true, sectionName: 'Fuel' },
        { text: 'Extra', loc: 16, halfHeight: true }, { text: 'Total', loc: 17, halfHeight: true },
    ];
    return (
        <div className={ 'upperBox' }>
            <div className={ 'topLeftText thickBorder cellHeight'} style={ { gridRow: 1, gridColumn: 'span 7 / 8' } }>Cruise Altitude</div>
            <div className={ 'topLeftText thickBorder cellHeight'} style={ { gridRow: 1, gridColumn: 'span 3 / 11' } }>Cruise KTAS</div>
            <div className={ 'topLeftText thickBorder cellHeight'} style={ { gridRow: 1, gridColumn: 'span 7 / 18' } }>Heading</div>
            {
                    upperBoxHeaders.map((header, idx) =>
                        <div style={ { gridRow: 2, gridColumn: header.loc } }>
                            { header.halfHeight &&
                                <div style={ { gridRow: 2, gridColumn: header.loc, height: '1rem', top: 0 } }>
                                    { header.sectionName }
                                </div>
                            }
                                <div
                                    className={ 'thickBorder' }
                                    style={ {
                                        height: header.halfHeight ? '1.5rem'  : '2.5rem',
                                    } }
                                >
                                    { header.text }
                                </div>
                        </div>
                    )
                }
        </div>
    );
}

export default Plan;
