import React, { Fragment, useState } from 'react';
import './Plan.css';
import Cell from "./Cell";
import { computeTotalCellValue, distance, flightTime, sum } from "./computeFuncs";
import RowEditor from "./RowEditor";
import { TimePicker } from "@material-ui/pickers";
import TextField from "./TextField";
import {capHeading} from "./utils";

export const upperBoxHeaders = [
    { defaultValue: '', text: 'Leg Name', loc: `span 2 / 3`, val: 'name', underlyingValue: 'latlng' },
    { defaultValue: '', text: 'Hdg', loc: 3, halfHeight: true, sectionName: 'Wind', val: 'windHdg' },
    { defaultValue: '', text: 'Spd', loc: 4, halfHeight: true, val: 'windSpd' },
    { defaultValue: '', text: 'True Course', loc: 5, val: 'trueCourse', isHeading: true },
    { defaultValue: '', text: '+w, -e', loc: 6, val: 'magVariance' },
    { defaultValue: '', text: 'Mag Course', loc: 7, val: 'magCourse', readOnly: true, isComputed: true, computeFrom: ['trueCourse', 'magVariance'], computeFunc: sum, isHeading: true  },
    { defaultValue: '', text: '-L +R', loc: 8, val: 'windCrctAngle' },
    { defaultValue: '', text: 'Fly Hdg', loc: 9, val: 'magHdg', highlight: true, readOnly: true, isComputed: true, computeFrom: ['magCourse', 'windCrctAngle'], computeFunc: sum, isHeading: true },
    { defaultValue: '', text: 'Ground V', loc: 10, val: 'groundSpeed' },
    { defaultValue: '', hasTotal: true, text: 'Miles', loc: 11, val: 'distance', isComputed: true, computeFromUnderlying: ['latlng'], computeFunc: distance, totalComputeFunc: sum },
    { defaultValue: '', hasTotal: true, text: 'Time', loc: 12, val: 'time', highlight: true, readOnly: true, isComputed: true, computeFrom: ['groundSpeed', 'distance'], computeFunc: flightTime, totalComputeFunc: sum },
    { defaultValue: '---', text: 'Start/Taxi/TkOff', loc: 13, halfHeight: true, sectionName: 'Fuel', val: 'fuelStartTakeoff' },
    { defaultValue: '---', text: 'Climb', loc: 14, halfHeight: true, val: 'fuelClimb' },
    { defaultValue: '---', text: 'Cruise', loc: 15, halfHeight: true, val: 'fuelCruise' },
    { defaultValue: '---', text: 'Extra', loc: 16, halfHeight: true, val: 'fuelExtra' },
    { defaultValue: '', hasTotal: true, totalComputeFunc: sum, text: 'Total', loc: 17, halfHeight: true, val: 'fuelTotal', readOnly: true, isComputed: true, computeFrom: ['fuelStartTakeoff', 'fuelClimb', 'fuelCruise', 'fuelExtra'], computeFunc: sum },
];

function UpperBox({ className, cruiseAlt, cruiseKTAS, legs, moveRow, setLegs, removeRow, showRowEditor, setCruiseAlt, setCruiseKTAS }) {
    const [focusedBox, setFocusedBox] = useState('');

    const topRow = {
        cruiseAlt: {
            label: 'Cruise Altitude',
            loc: 'span 7 / 8',
            setValFunc: setCruiseAlt,
            val: cruiseAlt,
        },
        cruiseKTAS: {
            label: 'Cruise KTAS',
            loc: 'span 3 / 11',
            setValFunc: setCruiseKTAS,
            val: cruiseKTAS
        }
    };
    const onTextFieldSubmit = (val, col, row) => {
        const newLegs = legs;
        newLegs[row][col] = val;
        setLegs(newLegs);
    }
    return (
        <div className={ `upperBox ${ className }` }>
            {
                Object.values(topRow).map(topRowHeader =>
                    <TextField
                        defaultValue={ topRowHeader['val'] }
                        editableFieldStyle={ { gridRow: 1, gridColumn: topRowHeader.loc } }
                        focused={ focusedBox === `1/${ topRowHeader.loc }` }
                        key={ `toprow-${ topRowHeader.label }` }
                        onClickAway={ val => {
                            setFocusedBox('');
                            topRowHeader.setValFunc(val);
                        } }
                        onEnterPressed={ val => {
                            setFocusedBox('');
                            topRowHeader.setValFunc(val);
                        }}
                        onFocus={ () => setFocusedBox(`1/${ topRowHeader.loc }`) }
                        onTabPressed={ () => setFocusedBox(`1/${ topRowHeader.loc }`)}
                        unfocusedContent={
                            <Fragment>
                                { topRowHeader.label }
                                <span className={ 'centerText normalText' }>{ topRowHeader['val'] }</span>
                            </Fragment>

                        }
                        unfocusedWrapperClass={ 'topLeftText thickBorder cell cellHover' }
                        unfocusedWrapperStyle={ { gridRow: 1, gridColumn: topRowHeader.loc } }
                        usesUnderlyingValue={ false }
                    />
                )
            }
            <div className={ 'thickBorder cell centerText'} style={ { gridRow: 1, gridColumn: 'span 7 / 18' } }>
                <span className={ 'topLeftText' }>Heading</span>
                <span style={ { display: 'inline-flex', justifyContent: 'space-evenly', width: '100%' } }>
                    { legs.map((l, idx) =>
                        <span key={ `upperMagHdg-${ idx }` }>
                            <span>{ `Leg ${idx + 1}: ` }</span>
                            <span className={ 'boldText'} >{ capHeading(l.magHdg)?.toString().padStart(3, '0') }&#176;</span>
                        </span>
                    ) }
                </span>
            </div>
            {
                upperBoxHeaders.map((header, idx) =>
                    <div key={ `upperHeaders-${ header.val }` } style={ { gridRow: 2, gridColumn: header.loc } }>
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
                    <Fragment key={ `upperBoxFrag=${ rowIdx }` }>
                        {
                            upperBoxHeaders.map((h, colIdx) =>
                               <Cell
                                    colNum={ colIdx }
                                    focused={ focusedBox === `${ rowIdx }/${ colIdx }` }
                                    header={ h }
                                    headers={ upperBoxHeaders }
                                    key={ `upperLegs-${ rowIdx }${ colIdx }` }
                                    onTextFieldSubmit={ onTextFieldSubmit }
                                    rowNum={ rowIdx }
                                    rows={ legs }
                                    setFocusedCell={ setFocusedBox }
                                />
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
                    <div
                        className={ 'normalBorder centerText cell italicText' }
                        key={ `upperTotals-${ header.val }`}
                        style={ { gridRow: 3 + legs.length, gridColumn: header.loc } }
                    >
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


export function TwoCellsWithHeader ({ cell1Title, cell1Value, cell2Title, cell2Value, gridColumn, gridRow, header, setCell1Value, setCell2Value }) {
    return (
        <div className={ 'normalBorder cell' }
             style={ { gridRow, gridColumn, minHeight: '3rem' } }>
            <div className={ 'boldText' } style={ { borderBottom: '1px solid black', height: '30%', fontSize: '0.8rem' } }>
                { header }
            </div>
            <div className={ 'flex spaceAround' } style={ { bottom: 0 } }>
                <div className={ 'flex column' } style={ { borderRight: '1px solid black', width: '50%' } }>
                    <span className={ 'topLeftText' }>{ cell1Title }</span>
                    <TimePicker
                        id="time-picker"
                        value={ cell1Value }
                        onChange={ time => setCell1Value(time) }
                    />
                </div>
                <div className={'flex column'} style={{borderRight: '1px solid black', width: '50%'}}>
                    <span className={'topLeftText'}>{ cell2Title }</span>
                    <TimePicker
                        id="time-picker"
                        value={ cell2Value }
                        onChange={ time => setCell2Value(time) }
                    />
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
