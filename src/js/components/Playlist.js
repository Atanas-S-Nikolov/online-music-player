import { useState } from "react";
import Dropzone from "react-dropzone";

import { 
    styled,
    Box,
    Typography, 
    Paper, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemText,
    Button
} from "@mui/material";
import { Close, PlaylistAdd } from "@mui/icons-material";

import CustomWidthTooltip from "./CustomWidthTooltip";
import StyledIconButton from "./StyledIconButton";

import TrackContext from "../utils/TrackContext";

import { storage } from "../firebase/Firebase";
import { ref, uploadBytes, deleteObject, list } from "firebase/storage";

export default function Playlist() {
    const [tracks, setTracks] = useState([]);

    const Divider = styled('hr')(({ theme }) => ({
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        border: "solid 1px"
    }));

    const StyledPaper = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        maxHeight: 100,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.4em'
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            outline: '1px slategrey',
            borderRadius: '10%'
          } 
    }));

    function uploadTracks(tracks) {
        const track = tracks[0];
        const trackRef = ref(storage, track.name);
        return uploadBytes(trackRef, track);
    }

    function removeTrackByName(name) {
        const trackRef = ref(storage, `/${name}`);
        return deleteObject(trackRef);
    }

    function listTracks() {
        list(ref(storage)).then(response => setTracks(response.items));
    }

    const renderTracks = () => {
        return(tracks.map((track, index) => {
            return (
                <Box>
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={`${index + 1}. ${track._location.path}`}/>
                        </ListItemButton>
                        <CustomWidthTooltip
                            title="Remove track from the playlist"
                            placement="right"
                        >
                            <StyledIconButton onClick={() => {
                                const trackName = track._location.path;
                                removeTrackByName(trackName)
                                .then(() => {
                                    setTracks(tracks.filter(data => data._location.path !== trackName));
                                    console.log("Track removed successfully!")
                                });
                            }}>
                                <Close/>
                            </StyledIconButton>
                        </CustomWidthTooltip>
                    </ListItem>
                </Box>
            )
        }));
    }

    return(
        <div id="playlist">
            <Typography variant="h5">Playlist</Typography>
            <Divider/>
            <StyledPaper>
                <List disablePadding>
                    {renderTracks()}
                </List>
            </StyledPaper>
            <TrackContext.Consumer>
                {({ updateCurrentTrackUrl }) => (
                    <Dropzone onDrop={acceptedFiles => {
                        const result = uploadTracks(acceptedFiles);
                        result.then((response) => {
                            listTracks();
                            console.log("From response", response);
                            console.log("Tracks from response: ", tracks);
                            updateCurrentTrackUrl(`https://${response.ref._service._host}/v0/b/${response.ref._location.bucket}/o/${response.ref._location.path}?alt=media`);
                        })
                    }}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <CustomWidthTooltip
                                        title="Drag 'n' drop some files here, or click to select files"
                                        placement="bottom-end"
                                    >
                                        <Button 
                                            startIcon={<PlaylistAdd/>}
                                            sx={{ width: "100%" }}
                                        >
                                            Add Track
                                        </Button>
                                    </CustomWidthTooltip>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                )}                
            </TrackContext.Consumer>
        </div>
    );
}
