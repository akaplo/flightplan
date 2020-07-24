import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Plan.css';
import {ClickAwayListener, TextField} from "@material-ui/core";

const Cell = ({ focused, rowNum, colNum, header, headers, setFocusedCell, onTextFieldSubmit, rows }) => {
    return (
        <Fragment>
            {
                focused &&
                <ClickAwayListener onClickAway={ () => setFocusedCell('') }>
                    <TextField
                        autoFocus
                        color={ 'secondary' }
                        onBlur={ (e) => {
                            console.log('hi')
                            onTextFieldSubmit(e, header.val, rowNum);
                        } }
                        onKeyDown={ (e) => {
                            if (e.keyCode === 13) {
                                onTextFieldSubmit(e, header.val, rowNum);
                                setFocusedCell('')
                            } else if (e.keyCode === 9) {
                                e.preventDefault();
                                onTextFieldSubmit(e, header.val, rowNum);
                                let newCol;
                                let newRow = rowNum;
                                if (e.shiftKey) {
                                    newCol = colNum === 0 ? headers.length - 1 : colNum - 1;
                                    // Reached beginning of row
                                    if (newCol > colNum) {
                                        // if this is the first row
                                        if (rowNum === 0) {
                                            newRow = undefined;
                                        } else {
                                            newRow = rowNum - 1;
                                        }
                                    }
                                } else {
                                    newCol = colNum === headers.length - 1 ? 0 : colNum + 1;
                                    // Reached end of row
                                    if (newCol < colNum) {
                                        // if this is the last row
                                        if (rowNum === rows.length -1) {
                                            newRow = undefined;
                                        } else {
                                            newRow = rowNum + 1;
                                        }
                                    }
                                }
                                setFocusedCell(newRow !== undefined ? `${ newRow }/${ newCol }` : '')
                            }
                        } }
                        style={ { gridRow: 3 + rowNum, gridColumn: header.loc, height: 'auto' } }
                        variant={ 'outlined' }
                        defaultValue={ rows[rowNum][header.val] }
                    />
                </ClickAwayListener>
            }
            {
                !focused &&
                <div className={ `normalBorder centerText thickCell ${ !header.readOnly && 'cellHover' }` }
                     style={ { gridRow: 3 + rowNum, gridColumn: header.loc, height: 'auto' } }
                     onClick={ () => !header.readOnly && setFocusedCell(`${ rowNum }/${colNum}`)}
                >
                    { rows[rowNum][header.val] || '' }
                </div>
            }
        </Fragment>
    );
}

Cell.propTypes = {
    focused: PropTypes.bool,
    rowNum: PropTypes.number,
    colNum: PropTypes.number,
    header: PropTypes.shape({
        /** Location in the horizontal axis of the grid the header should appear
         * Example "1 / 2" (start at column 1, end at column 2). See gridColumn property of grids, MDN.
         */
        loc: PropTypes.string,
        /** Whether this cell can be edited by the user */
        readOnly: PropTypes.bool,
        /** The header's value, which is used to key into a row to get the data to display */
        val: PropTypes.string
    }),
    headers: PropTypes.arrayOf(PropTypes.object),
    setFocusedCell: PropTypes.func,
    onTextFieldSubmit: PropTypes.func,
    rows: PropTypes.arrayOf(PropTypes.object)
}

export default Cell
