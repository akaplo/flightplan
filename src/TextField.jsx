import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { ClickAwayListener, TextField as MUITextField} from "@material-ui/core";

const TextField = ({
                       defaultValue,
                       editableFieldStyle,
                       focused,
                       key,
                       onClickAway,
                       onEnterPressed,
                       onFocus,
                       onTabPressed,
                       unfocusedContent,
                       unfocusedWrapperClass,
                       unfocusedWrapperStyle,
                       usesUnderlyingValue
}) => {
    const [val, setVal] = useState(defaultValue);

    return (
        <Fragment>
            {
                focused &&
                <ClickAwayListener onClickAway={ () => !usesUnderlyingValue && onClickAway(val) }>
                    <MUITextField
                        autoFocus
                        color={ 'secondary' }
                        key={ `textfield-${ key }` }
                        onChange={ e => setVal(e.target.value) }
                        onKeyDown={ (e) => {
                            if (e.keyCode === 13) {
                                onEnterPressed(val);
                            } else if (e.keyCode === 9) {
                                e.preventDefault();
                                if (e.shiftKey) {
                                    onTabPressed(val, true);
                                } else {
                                    onTabPressed(val, false);
                                }
                            }
                        } }
                        style={ editableFieldStyle }
                        variant={ 'outlined' }
                        defaultValue={ defaultValue }
                    />
                </ClickAwayListener>
            }
            {
                !focused &&
                <div className={ unfocusedWrapperClass || 'normalBorder centerText thickCell' }
                     style={ unfocusedWrapperStyle }
                     onClick={ onFocus }
                >
                    { unfocusedContent }
                </div>
            }
        </Fragment>
    )
};

TextField.propTypes = {
    onClickAway: PropTypes.func, // onClickAway(textFieldValue: string),
    onFocus: PropTypes.func,
    onTabPressed: PropTypes.func, // onTabPressed(textFieldValue: string, shiftPressed: bool),
    editableFieldStyle: PropTypes.object, // object literal with CSS for the MUI text field when focused
    unfocusedContent: PropTypes.element, // DOM node to render when not focused
    unfocusedWrapperClass: PropTypes.string, // classname for div wrapper around un-editable field when not focused
    unfocusedWrapperStyle: PropTypes.object // literal CSS for div wrapper around un-editable field when not focused
}

export default TextField;
