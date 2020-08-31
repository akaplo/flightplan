import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

import { ClickAwayListener, TextField as MUITextField } from '@material-ui/core'

const TextField = ({
  defaultValue,
  editableFieldStyle,
  focused,
  onClickAway,
  onEnterPressed,
  onFocus,
  onTabPressed,
  unfocusedContent,
  unfocusedWrapperClass,
  unfocusedWrapperStyle,
  usesUnderlyingValue
}) => {
  const [val, setVal] = useState(defaultValue)

  return (
    <Fragment>
      {
        focused &&
                <ClickAwayListener onClickAway={ () => !usesUnderlyingValue && onClickAway(val) }>
                  <MUITextField
                    autoFocus
                    color={ 'secondary' }
                    key={ `textfield-${defaultValue}-${usesUnderlyingValue}` }
                    onChange={ e => setVal(e.target.value) }
                    onKeyDown={ (e) => {
                      if (e.keyCode === 13) {
                        onEnterPressed(val)
                      } else if (e.keyCode === 9) {
                        e.preventDefault()
                        if (e.shiftKey) {
                          onTabPressed(val, true)
                        } else {
                          onTabPressed(val, false)
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
                <div
                  className={ unfocusedWrapperClass || 'normalBorder centerText thickCell' }
                  key={ `textfield-${defaultValue}-${usesUnderlyingValue}` }
                  style={ unfocusedWrapperStyle }
                  onClick={ onFocus }
                >
                  { unfocusedContent }
                </div>
      }
    </Fragment>
  )
}

TextField.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  focused: PropTypes.bool,
  /** onClickAway(textFieldValue: string) */
  onClickAway: PropTypes.func,
  onEnterPressed: PropTypes.func,
  onFocus: PropTypes.func,
  /** onTabPressed(textFieldValue: string, shiftPressed: bool) */
  onTabPressed: PropTypes.func,
  /** object literal with CSS for the MUI text field when focused */
  editableFieldStyle: PropTypes.object,
  /** DOM node to render when not focused */
  unfocusedContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /** classname for div wrapper around un-editable field when not focused */
  unfocusedWrapperClass: PropTypes.string,
  /** literal CSS for div wrapper around un-editable field when not focused */
  unfocusedWrapperStyle: PropTypes.object,
  usesUnderlyingValue: PropTypes.bool
}

export default TextField
