import React, { Fragment, useState } from 'react';
import './Plan.css';
import Cell from "./Cell";

import {computeTotalCellValue, flightTime, sum} from "./computeFuncs";
import RowEditor from "./RowEditor";
import {HalfHeightHeader, NormalHeightHeader, TwoCellsWithHeader, upperBoxHeaders} from "./UpperBox";

const OriginDestinationRow = ({ destination, origin, setDestination, setOrigin, setTakeoffTime, takeoffTime }) => {
    const [focusedBox, setFocusedBox] = useState('');
    const headers = [
        { defaultValue: '', text: 'Origin', loc: 'span 6 / 7', val: 'origin' },
        { defaultValue: '', text: 'Destination', loc: 'span 6 / 13', val: 'destination' },
    ];
    const row = [ {
        [headers[0].val]: origin,
        [headers[1].val]: destination
    } ];
    const onTextFieldSubmit = (e, col) => {
        const val = e.target.value;
        switch (col) {
            case headers[0].val:
                setOrigin(val);
                break;
            case headers[1].val:
                setDestination(val);
                break;
            default: break;
        }
    }
    console.log(focusedBox)
    return (
        <div className={ 'originDestinationRow' }>
            {
                headers.map((header, idx) =>
                    <div style={ { gridRow: 0, gridColumn: header.loc } }>
                        <NormalHeightHeader text={ header.text }/>
                    </div>
                )
            }
            {
                headers.map((header, headerIdx) =>
                    <Cell
                        colNum={ header.loc }
                        focused={ focusedBox === `${ 0 }/${ header.loc }` }
                        header={ header }
                        headers={ headers }
                        onTextFieldSubmit={ onTextFieldSubmit }
                        rowNum={ 0 }
                        rows={ row }
                        setFocusedCell={ setFocusedBox }
                    />
                )
            }

            <TwoCellsWithHeader
                cell1Title={ 'Est' }
                cell1Value={ takeoffTime }
                cell2Title={ 'Actual' }
                header={ 'Takeoff Time' }
                gridColumn={ 'span 4 / 21' }
                gridRow={ 0 }
                setCell1Value={ setTakeoffTime }
            />
        </div>
    );
};

export default OriginDestinationRow;
