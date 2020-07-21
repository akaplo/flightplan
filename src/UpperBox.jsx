import React, { Fragment, useState } from 'react';
import './Plan.css';

function UpperBox({ className, origin, destination, legs, takeoffTimeEst, }) {
    const upperBoxHeaders = [
        { text: 'Leg Name', loc: `span 2 / 3`, val: 'name' },
        { text: 'Hdg', loc: 3, halfHeight: true, sectionName: 'Wind', val: 'windHdg' },
        { text: 'Spd', loc: 4, halfHeight: true, val: 'windSpd' },
        { text: 'True Course', loc: 5, val: 'trueCourse' },
        { text: '+w, -e', loc: 6, val: 'magVariance' },
        { text: 'Mag Course', loc: 7, val: 'magCourse' },
        { text: '-L +R', loc: 8, val: 'windCrctAngle' },
        { text: 'Fly Hdg', loc: 9, val: 'magHdg', highlight: true },
        { text: 'Ground V', loc: 10, val: 'groundSpeed' },
        { hasSum: true, text: 'Miles', loc: 11, val: 'distance' },
        { hasSum: true, text: 'Time', loc: 12, val: 'time', highlight: true },
        { text: 'Start/Taxi/TkOff', loc: 13, halfHeight: true, val: 'fuelStartTakeoff' },
        { text: 'Climb', loc: 14, halfHeight: true, val: 'fuelClimb' },
        { text: 'Cruise', loc: 15, halfHeight: true, sectionName: 'Fuel', val: 'fuelCruise' },
        { text: 'Extra', loc: 16, halfHeight: true, val: 'fuelExtra' },
        { hasSum: true, text: 'Total', loc: 17, halfHeight: true, val: 'fuelTotal' },
    ];
    return (
        <div className={ `upperBox ${ className }` }>
            <div className={ 'topLeftText thickBorder cell'} style={ { gridRow: 1, gridColumn: 'span 7 / 8' } }>Cruise Altitude</div>
            <div className={ 'topLeftText thickBorder cell'} style={ { gridRow: 1, gridColumn: 'span 3 / 11' } }>Cruise KTAS</div>
            <div className={ 'topLeftText thickBorder cell'} style={ { gridRow: 1, gridColumn: 'span 7 / 18' } }>Heading</div>
            {
                upperBoxHeaders.map((header, idx) =>
                    <div style={ { gridRow: 2, gridColumn: header.loc } }>
                        { header.halfHeight &&
                            <HalfHeightHeader gridRow={ 2 } gridColumn={ header.loc } cellText={ header.text } sectionName={ header.sectionName }/>
                        }
                        {
                            !header.halfHeight &&
                                <NormalHeightHeader text={ header.text }/>
                        }
                    </div>
                )
            }
            {
                legs.map((leg, idx) =>
                    upperBoxHeaders.map(h =>
                        <div className={ 'normalBorder centerText thickCell' } style={ { gridRow: 3   + idx, gridColumn: h.loc, height: 'auto' } }>
                            { h.highlight ? <mark>{ leg[h.val] || '---' }</mark> : leg[h.val] || '---' }
                        </div>
                    )
                )
            }
            {
                upperBoxHeaders.map(header =>
                    header.hasSum && <div className={ 'normalBorder centerText cell italicText' } style={ { gridRow: 3 + legs.length, gridColumn: header.loc } }>
                        { legs.map(l => l[header.val]).reduce((accumulator, currentValue) => accumulator + currentValue) }
                    </div>
                )
            }
            <div className={ 'normalBorder cell' } style={ { gridRow: 5 + legs.length, gridColumn: 'span 4 / 5', height: '3rem' } }>
                <div className={ 'boldText' } style={ { borderBottom: '1px solid black', height: '30%', fontSize: '0.8rem' } }>Origin</div>
                <div className={ 'centerText' } style={ { borderBottom: '1px solid black', height: '70%' } }>{ origin }</div>
            </div>
            <div className={ 'normalBorder cell' } style={ { gridRow: 5 + legs.length, gridColumn: 'span 4 / 9', height: '3rem' } }>
                <div className={ 'boldText' } style={ { borderBottom: '1px solid black', height: '30%', fontSize: '0.8rem' } }>Destination</div>
                <div className={ 'centerText' } style={ { borderBottom: '1px solid black', height: '70%' } }>{ destination }</div>
            </div>
            <TwoCellsWithHeader cell1Title={ 'Est' } cell1Value={ takeoffTimeEst } cell2Title={ 'Actual' } gridColumn={ 'span 2 / 11' } gridRow={ 5 + legs.length } header={ 'Takeoff Time' } />
        </div>
    );
}
UpperBox.defaultProps = {
    legs: [
        { name: 'KPYM -> Pt Judith', windHdg: 120, windSpd: 12, trueCourse: 200, magVariance: '14', magCourse: '214', windCrctAngle: '1', magHdg: '215', groundSpeed: 95, distance: 45, time: 35, fuelStartTakeoff: 1.1, fuelClimb: 2, fuelCruise: 7, fuelExtra: 0, fuelTotal: 10.1 },
        { name: 'Pt Judith -> KBID', windHdg: 130, windSpd: 10, trueCourse: 180, magVariance: '14', magCourse: '194', windCrctAngle: '3', magHdg: '197', groundSpeed: 98, distance: 13, time: 8, fuelStartTakeoff: 0, fuelClimb: 0, fuelCruise: .6, fuelExtra: 4, fuelTotal: 4.6 }
    ],
    takeoffTimeEst: '12:30pm',
    origin: 'Plymouth, MA (PYM)',
    destination: 'BLock Island, RI (KBID)'
};

export default UpperBox;


export function TwoCellsWithHeader ({ cell1Title, cell1Value, cell2Title, cell2Value, gridColumn, gridRow, header }) {
    return (
        <div className={'normalBorder cell'}
             style={{gridRow, gridColumn, minHeight: '3rem'}}>
            <div className={'boldText'} style={{borderBottom: '1px solid black', height: '30%', fontSize: '0.8rem'}}>
                { header }
            </div>
            <div className={'flex spaceAround'} style={{bottom: 0}}>
                <div className={'flex column'} style={{borderRight: '1px solid black', width: '50%'}}>
                    <span className={'topLeftText'}>{ cell1Title }</span>
                    <span style={{fontSize: '1rem'}}>{ cell1Value }</span>
                </div>
                <div className={'flex column'} style={{borderRight: '1px solid black', width: '50%'}}>
                    <span className={'topLeftText'}>{ cell1Title }</span>
                    <span style={{fontSize: '1rem'}}>{ cell2Value }</span>
                </div>
            </div>
        </div>
    );
}

export function HalfHeightHeader ({ gridColumn, gridRow, sectionName, cellText }) {
    return (
        <Fragment>
            <div className={ `thickBorderBottom thickBorderTop  italicText` } style={ { gridRow, gridColumn, height: '1rem', top: 0 } }>
                { sectionName }
            </div>
            <div
                className={ 'thickBorderLeft thickBorderRight centerText boldText' }
                style={ {
                    height: '1.5rem',
                    fontStyle: 'italic'
                } }
            >
                { cellText }
            </div>
        </Fragment>
    );
}

export function NormalHeightHeader ({ text }) {
    return (
        <div
            className={ 'thickBorder centerText boldText' }
            style={ {
                height: '2.5rem',
            } }
        >
            { text }
        </div>
    );
}
