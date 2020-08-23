import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import './Plan.css';
import { HalfHeightHeader, NormalHeightHeader } from "./UpperBox";
import Cell from "./Cell";
import RowEditor from "./RowEditor";
import FrequenciesBox from "./FrequenciesBox";
import { sum } from './computeFuncs';

export const lowerBoxHeaders = [
    {text: 'Checkpoints', loc: `span 4 / 5`, val: 'description'},
    { text: 'Pt to Pt', loc: 5, val: 'distPtToPt', sectionName: 'Distance', halfHeight: true },
    {text: 'Remaining', loc: 6, val: 'distRemaining', halfHeight: true, isComputed: true, computeFunc: sum, readOnly: true, defaultValue: '---' },
    {text: 'Estimated', loc: 7, val: 'timeElapsedEst', sectionName: 'Elapsed Time', halfHeight: true },
    {text: 'Actual', loc: 8, val: 'timeElapsedAct', halfHeight: true },
    {text: 'Estimated', loc: 9, val: 'timeArrivedEst', sectionName: 'Arrival Time', halfHeight: true },
    {text: 'Actual', loc: 10, val: 'timeArrivedAct', halfHeight: true },
    {text: 'Remarks', loc: 'span 2 / 13', val: 'remarks' }
];

function LowerBox({ checkpoints, className, frequencies, moveRow, removeRow, setCheckpoints, setFrequencies, showRowEditor, totalMiles }) {
    const [focusedBox, setFocusedBox] = useState('');
    const onTextFieldSubmit = (val, col, row) => {
        const newCheckpoints = checkpoints;
        newCheckpoints[row][col] = val;
        setCheckpoints(newCheckpoints);
    }
    return (
        <div className={ `lowerBox${ className ? ` ${ className }` : '' }` }>
            {
                lowerBoxHeaders.map(header =>
                    <div key={ `checkpts-headers-${ header.val }` } style={ { gridRow: 2, gridColumn: header.loc } }>
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
                checkpoints.map((checkpt, row) =>
                    <Fragment key={ `checkpts-rows-${ row }` }>
                        {
                            lowerBoxHeaders.map((h, col) =>
                                <Cell
                                    header={ h }
                                    colNum={ col }
                                    focused={ focusedBox === `${ row }/${ col }` }
                                    headers={ lowerBoxHeaders }
                                    key={ `checkpts-vals-${ row }${ col }` }
                                    onTextFieldSubmit={ onTextFieldSubmit }
                                    rowNum={ row }
                                    rows={ checkpoints }
                                    setFocusedCell={ setFocusedBox }
                                />
                            )
                        }
                        {
                            showRowEditor &&
                                <RowEditor moveRow={ moveRow } removeRow={ removeRow } rowIndex={ row } rows={ checkpoints }/>
                        }
                    </Fragment>
                )
            }
            <FrequenciesBox frequencies={ frequencies } setFrequencies={ setFrequencies }/>
        </div>
    );
}

LowerBox.defaultProps = {
    takeoffTimeEst: '12:30pm',
    origin: 'Plymouth, MA (PYM)',
    destination: 'BLock Island, RI (KBID)'
};

LowerBox.propTypes = {
    frequencies: PropTypes.object, // see FrequenciesBox for shape details
    setFrequencies: PropTypes.func
}

export default LowerBox;
