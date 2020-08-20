import React, { useRef } from 'react';
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
import LowPriorityIcon from '@material-ui/icons/LowPriority';
import html2canvas from 'html2canvas';
import ImageIcon from '@material-ui/icons/Image';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';

const ActionsBar = ({ addEmptyCheckpoint, addEmptyLeg, generateFile, showCheckpointEditor, checkpointEditorVisible, loadFakeData, loadFlightPlan, reverseFlightPlan, setActionBarVisible }) => {
    const inputFile = useRef(null);
    return (
        <footer className={ 'bar' }>
            <Tooltip title={ 'By Aaron Kaplowitz, 2020' }>
                <div className={ 'logo' }>
                    FlightPlanJS
                </div>
            </Tooltip>

            <Tooltip title={ checkpointEditorVisible ? 'Cancel' : 'Move/Remove Rows' }>
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
            <Tooltip title={ 'Save Plan' }>
                <IconButton onClick={ () => {
                    const { blob, fileName } = generateFile();
                    downloadBlobAsFile(blob, fileName)
                } }>
                    <SaveIcon/>
                </IconButton>
            </Tooltip>
            <input type={ 'file' } onChange={ (e) => {
                const files = e.target.files;
                if (files.length === 0 || files.length > 1) {
                    console.error('wrong number of files uploaded');
                    return;
                }
                files[0].text().then(data => loadFlightPlan(JSON.parse(data)));
            } } ref={ inputFile } style={ { display: 'none' } }/>
            <Tooltip title={ 'Open Plan' }>
                <IconButton onClick={ () => inputFile.current.click() }>
                    <FolderOpenIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={ 'Reverse Plan' }>
                <IconButton onClick={ reverseFlightPlan }>
                    <LowPriorityIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={ 'Generate Downloadable Image' }>
                <IconButton onClick={ () => {
                    const prevHeight = document.body.scrollHeight;
                    setActionBarVisible(false);
                    window.setTimeout(() => {
                        html2canvas(document.body).then(function(canvas) {
                            document.body.appendChild(canvas);
                            setActionBarVisible(true, canvas);
                            window.scrollTo({ behavior: 'smooth', top: prevHeight });
                        });
                    }, 200)
                } }>
                    <ImageIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={ 'Reverse Plan' }>
                <IconButton onClick={ loadFakeData }>
                    <DonutSmallIcon/>
                </IconButton>
            </Tooltip>
        </footer>
    );
}

export default ActionsBar
