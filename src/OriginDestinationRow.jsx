import React, { useState } from 'react';
import './Plan.css';
import Cell from "./Cell";

import { NormalHeightHeader, TwoCellsWithHeader } from "./UpperBox";
import TextField from "./TextField";

const OriginDestinationRow = ({ destination, origin, setDestination, setOrigin, setTakeoffTimeAct, setTakeoffTimeEst, takeoffTimeEst, takeoffTimeAct }) => {
    const [focusedBox, setFocusedBox] = useState(undefined);
    const headers = [
        { defaultValue: '', text: 'Origin', loc: 'span 4 / 5', val: 'origin' },
        { defaultValue: '', text: 'Destination', loc: 'span 4 / 9', val: 'destination' },
    ];
    const row = [ {
        [headers[0].val]: origin,
        [headers[1].val]: destination
    } ];
    const onTextFieldSubmit = (val, col) => {
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
                    <div key={ `origdest-headers-${ header.val }`} style={ { gridRow: 1, gridColumn: header.loc } }>
                        <NormalHeightHeader text={ header.text }/>
                    </div>
                )
            }
            {
                headers.map((header, headerIdx) =>
                    <TextField
                        defaultValue={ header.val === 'origin' ? origin : destination }
                        editableFieldStyle={ { gridRow: 2, gridColumn: header.loc } }
                        focused={ focusedBox === headerIdx }
                        key={ header.val }
                        onEnterPressed={ (val) => {
                            onTextFieldSubmit(val, header.val);
                            setFocusedBox(undefined);
                        } }
                        onFocus={ () => setFocusedBox(headerIdx) }
                        onClickAway={ (val) => {
                            onTextFieldSubmit(val, header.val);
                            setFocusedBox(undefined);
                        } }
                        onTabPressed={ (val, shiftPressed) => {
                            onTextFieldSubmit(val, header.val);
                            if (headerIdx === 0) {
                                setFocusedBox(shiftPressed ? undefined : 1);
                            } else if (headerIdx === headers.length - 1) {
                                setFocusedBox(shiftPressed ? headerIdx - 1 : undefined)
                            } else {
                                setFocusedBox(shiftPressed ? headerIdx - 1 : headerIdx + 1);
                            }
                        } }
                        unfocusedContent={ header.val === 'origin' ? origin : destination }
                        unfocusedWrapperClass={ `normalBorder centerText thickCell ${ !header.readOnly ? 'cellHover' : '' }` }
                        unfocusedWrapperStyle={ { gridRow: 2, gridColumn: header.loc } }
                        usesUnderlyingValue={ false }
                    />
                )
            }

            <TwoCellsWithHeader
                cell1Title={ 'Est' }
                cell1Value={ takeoffTimeEst }
                cell2Value={ takeoffTimeAct }
                cell2Title={ 'Actual' }
                header={ 'Takeoff Time' }
                setCell1Value={ setTakeoffTimeEst }
                setCell2Value={ setTakeoffTimeAct }
            />
        </div>
    );
};

export default OriginDestinationRow;
