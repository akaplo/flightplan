import React, { useState } from 'react';
import './Plan.css';
import Cell from "./Cell";

import { NormalHeightHeader, TwoCellsWithHeader } from "./UpperBox";

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
    return (
        <div className={ 'originDestinationRow' }>
            {
                headers.map((header, idx) =>
                    <div key={ `origdest-headers-${ header.val }`} style={ { gridRow: 0, gridColumn: header.loc } }>
                        <NormalHeightHeader text={ header.text }/>
                    </div>
                )
            }
            {
                headers.map((header, headerIdx) =>
                    <Cell
                        colNum={ headerIdx }
                        focused={ focusedBox === `${ 0 }/${ headerIdx }` }
                        header={ header }
                        headers={ headers }
                        key={ `origdest-vals${ headerIdx }` }
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
