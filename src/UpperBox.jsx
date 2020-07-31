import React, { Fragment, useState } from 'react';
import './Plan.css';
import Cell from "./Cell";

import {computeTotalCellValue, flightTime, sum} from "./computeFuncs";
import RowEditor from "./RowEditor";

export const upperBoxHeaders = [
    { defaultValue: '', text: 'Leg Name', loc: `span 2 / 3`, val: 'name' },
    { defaultValue: '', text: 'Hdg', loc: 3, halfHeight: true, sectionName: 'Wind', val: 'windHdg' },
    { defaultValue: '', text: 'Spd', loc: 4, halfHeight: true, val: 'windSpd' },
    { defaultValue: '', text: 'True Course', loc: 5, val: 'trueCourse' },
    { defaultValue: '', text: '+w, -e', loc: 6, val: 'magVariance' },
    { defaultValue: '', text: 'Mag Course', loc: 7, val: 'magCourse', readOnly: true, isComputed: true, computeFrom: ['trueCourse', 'magVariance'], computeFunc: sum  },
    { defaultValue: '', text: '-L +R', loc: 8, val: 'windCrctAngle' },
    { defaultValue: '', text: 'Fly Hdg', loc: 9, val: 'magHdg', highlight: true, readOnly: true, isComputed: true, computeFrom: ['magCourse', 'windCrctAngle'], computeFunc: sum },
    { defaultValue: '', text: 'Ground V', loc: 10, val: 'groundSpeed' },
    { defaultValue: '', hasTotal: true, text: 'Miles', loc: 11, val: 'distance', totalComputeFunc: sum },
    { defaultValue: '', hasTotal: true, text: 'Time', loc: 12, val: 'time', highlight: true, readOnly: true, isComputed: true, computeFrom: ['groundSpeed', 'distance'], computeFunc: flightTime, totalComputeFunc: sum },
    { defaultValue: '---', text: 'Start/Taxi/TkOff', loc: 13, halfHeight: true, sectionName: 'Fuel', val: 'fuelStartTakeoff' },
    { defaultValue: '---', text: 'Climb', loc: 14, halfHeight: true, val: 'fuelClimb' },
    { defaultValue: '---', text: 'Cruise', loc: 15, halfHeight: true, val: 'fuelCruise' },
    { defaultValue: '---', text: 'Extra', loc: 16, halfHeight: true, val: 'fuelExtra' },
    { defaultValue: '', hasTotal: true, totalComputeFunc: sum, text: 'Total', loc: 17, halfHeight: true, val: 'fuelTotal', readOnly: true, isComputed: true, computeFrom: ['fuelStartTakeoff', 'fuelClimb', 'fuelCruise', 'fuelExtra'], computeFunc: sum },
];

function UpperBox({ className, legs, moveRow, takeoffTimeEst, setLegs, removeRow, showRowEditor }) {
    const [focusedBox, setFocusedBox] = useState('');
    const onTextFieldSubmit = (e, col, row) => {
        const newLegs = legs;
        newLegs[row][col] = e.target.value;
        setLegs(newLegs);
    }
    return (
        <div className={ `upperBox ${ className }` }>
            <div className={ 'topLeftText thickBorder cell'} style={ { gridRow: 1, gridColumn: 'span 7 / 8' } }>Cruise Altitude</div>
            <div className={ 'topLeftText thickBorder cell'} style={ { gridRow: 1, gridColumn: 'span 3 / 11' } }>Cruise KTAS</div>
            <div className={ 'thickBorder cell centerText'} style={ { gridRow: 1, gridColumn: 'span 7 / 18' } }>
                <span className={ 'topLeftText' }>Heading</span>
                <span style={ { display: 'inline-flex', justifyContent: 'space-evenly', width: '100%' } }>
                    { legs.map((l, idx) =>
                        <span>
                            <span>{ `Leg ${idx + 1}: ` }</span>
                            <span className={ 'boldText'} >{ l.magHdg }&#176;</span>
                        </span>
                    ) }
                </span>
            </div>
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
                legs.map((leg, rowIdx) =>
                    <Fragment>
                        {
                            upperBoxHeaders.map((h, colIdx) =>
                                <Cell
                                    colNum={ colIdx }
                                    focused={ focusedBox === `${ rowIdx }/${ colIdx }` }
                                    header={ h }
                                    headers={ upperBoxHeaders }
                                    onTextFieldSubmit={ onTextFieldSubmit }
                                    rowNum={ rowIdx }
                                    rows={ legs }
                                    setFocusedCell={ setFocusedBox }
                                />
                                // <div className={ 'normalBorder centerText thickCell' } style={ { gridRow: 3   + rowIdx, gridColumn: h.loc, height: 'auto' } }>
                                //     { h.highlight ? <mark>{ leg[h.val] || '---' }</mark> : leg[h.val] || '---' }
                                // </div>
                            )
                        }
                        {
                            showRowEditor &&
                            <RowEditor
                                moveRow={ moveRow }
                                removeRow={ removeRow }
                                rowIndex={ rowIdx }
                                rows={ legs }
                            />
                        }
                    </Fragment>
                )
            }
            {
                upperBoxHeaders.map(header =>
                    header.hasTotal && header.totalComputeFunc &&
                    <div className={ 'normalBorder centerText cell italicText' } style={ { gridRow: 3 + legs.length, gridColumn: header.loc } }>
                        { computeTotalCellValue(header, legs) }
                    </div>
                )
            }
        </div>
    );
}
UpperBox.defaultProps = {
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
                    <span className={'topLeftText'}>{ cell2Title }</span>
                    <span style={{fontSize: '1rem'}}>{ cell2Value }</span>
                </div>
            </div>
        </div>
    );
}

export function HalfHeightHeader ({ gridColumn, gridRow, sectionName, cellText }) {
    return (
        <Fragment>
            <div className={ `thickBorderBottom thickBorderTop ${ sectionName && 'borderLeft' } italicText` } style={ { gridRow, gridColumn, height: '1rem', top: 0 } }>
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
