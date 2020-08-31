import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const UnderlyingValueModal = ({ handleClose, mainValue, title, underlyingValue }) => {
  const [mainVal, updateMainVal] = useState(mainValue)
  const [underlyingVal, updateUnderlyingVal] = useState(underlyingValue || '')

  return (
    <Dialog open={true} onClose={ () => handleClose(mainVal, underlyingVal) }>
      <DialogTitle id="form-dialog-title">Set Value For { title }</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Main Value"
          onChange={ (e) => updateMainVal(e.target.value)}
          value={ mainVal }
          fullWidth
        />
        <TextField
          margin="dense"
          id="name"
          label="Underlying Value"
          onChange={ (e) => updateUnderlyingVal(e.target.value)}
          fullWidth
          value={ underlyingVal }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={ () => handleClose(mainVal, underlyingVal) } color="primary">
                    Accept
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UnderlyingValueModal
