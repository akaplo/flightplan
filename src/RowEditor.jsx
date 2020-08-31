import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

const RowEditor = ({ moveRow, removeRow, rowIndex, rows }) => {
  return (
    <div className={ 'flex' } style={ { gridRow: 3 + rowIndex } }>
      <IconButton
        disabled={ rows.length <= 1 }
        color={ 'secondary' }
        onClick={ () => removeRow(rowIndex) }
      >
        <DeleteIcon/>
      </IconButton>
      <IconButton
        color={ 'default'}
        disabled={ rowIndex === 0 }
        onClick={ () => moveRow(rowIndex, rowIndex - 1) }
      >
        <KeyboardArrowUpIcon/>
      </IconButton>
      <IconButton
        color={ 'primary' }
        disabled={ rowIndex === rows.length - 1 }
        onClick={ () => moveRow(rowIndex, rowIndex + 1) }
      >
        <KeyboardArrowDownIcon/>
      </IconButton>
    </div>
  )
}

RowEditor.propTypes = {
  moveRow: PropTypes.func,
  removeRow: PropTypes.func,
  rowIndex: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.object)
}

export default RowEditor
