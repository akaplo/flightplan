import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const UnderlyingValueModal = ({ handleClose, mainValue, title, underlyingValue, setMainValue, setUnderlyingValue }) => {
    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle id="form-dialog-title">Set Value For { title }</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Main Value"
                    onChange={ (e) => setMainValue(e.target.value)}
                    value={ mainValue }
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Underlying Value"
                    onChange={ (e) => setUnderlyingValue(e.target.value)}
                    fullWidth
                    value={ underlyingValue }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Accept
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UnderlyingValueModal;
