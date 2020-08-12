import React, { useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import './ActionsBar.css';
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import {downloadBlobAsFile} from "./fileUtils";

const ActionsBar = ({ addEmptyCheckpoint, addEmptyLeg, generateFile, showCheckpointEditor, checkpointEditorVisible }) => {
    return (
        <footer className={ 'bar' }>
            <Tooltip title={ checkpointEditorVisible ? 'Cancel' : 'Remove Rows' }>
                <IconButton onClick={ showCheckpointEditor }>
                    {
                        !checkpointEditorVisible && <EditIcon/>
                    }
                    {
                        checkpointEditorVisible && <HighlightOffIcon/>
                    }
                </IconButton>
            </Tooltip>
            <Tooltip title={ 'Add Leg' }>
                <IconButton onClick={ addEmptyLeg }>
                    <PlaylistAddIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={ 'Add Checkpoint' }>
                <IconButton onClick={ addEmptyCheckpoint }>
                    <AddLocationIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={ 'Save Plan (Coming Soon)' }>
                <IconButton onClick={ () => {
                    const { blob, fileName } = generateFile();
                    downloadBlobAsFile(blob, fileName)
                } }>
                    <SaveIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={ 'Open Plan' }>
                <IconButton disabled>
                    <FolderOpenIcon/>
                </IconButton>
            </Tooltip>
        </footer>
    );
}

export default ActionsBar
