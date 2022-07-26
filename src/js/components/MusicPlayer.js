import { useContext, useEffect, useState } from "react";

import { styled, Slider, Typography } from "@mui/material";
import { 
    PauseRounded, 
    PlayArrowRounded, 
    FastForwardRounded, 
    FastRewindRounded,
    SkipNextRounded,
    SkipPreviousRounded,
    VolumeMuteRounded,
    VolumeDownRounded,
    VolumeUpRounded
} from "@mui/icons-material";

import CustomWidthTooltip from "./CustomWidthTooltip";
import StyledIconButton from "./StyledIconButton";
import TrackContext from "../utils/TrackContext";
import { play, pause, seekBackward, seekForward, updateVolume } from "../utils/MusicControls";
import { getTrackDetails } from "../utils/TrackUtils";

const SliderDiv = styled('div')({ 
    justifyContent: "left",
    alignItems: "center",
    display: "flex",
    gap: "15px"
});

function renderVolumeIcon(volume) {
    if (volume <= 100 && volume >= 50) {
        return <VolumeUpRounded/>;
    } else if (volume < 50 && volume > 0) {
        return <VolumeDownRounded/>;
    } else {
        return <VolumeMuteRounded/>;
    }
}

function formatDuration(value) {
    value = parseInt(value);
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
}

export default function MusicPlayer() {
    const [duration, setDuration] = useState(0); //seconds
    const [position, setPosition] = useState(0);
    const [volume, setVolume] = useState(100);
    const [isPaused, setIsPaused] = useState(true);
    const context = useContext(TrackContext);
    const isVolumeMuted = volume === 0;
    const { 
        currentTrackRef, 
        currentTrackIndex, 
        currentTrackName, 
        tracks, 
        updateCurrentTrackIndex, 
        updateCurrentTrackName, 
        updateCurrentTrackUrl 
    } = context;

    function updatePlayerDuration(duration) {
        isNaN(duration)
            ? setDuration(0)
            : setDuration(duration)
    }

    function updatePlayerPosition(position) {
        setPosition(position)
    }

    useEffect(() => {
        const trackElement = currentTrackRef.current;
        updatePlayerDuration(trackElement.duration);
        updateCurrentTrackName(currentTrackName);
    }, [currentTrackRef, currentTrackName, updateCurrentTrackName])

    useEffect(() => {
        const trackElement = currentTrackRef.current;
        updatePlayerPosition(trackElement?.currentTime);
    }, [currentTrackRef ,currentTrackRef.current?.currentTime])

    return(
        <div id="music-player">
            <Typography variant="h6">{currentTrackName}</Typography>
            <SliderDiv>
                <Slider 
                    sx={{ width: "50%" }}
                    value={position}
                    min={0}
                    max={duration}
                    onChange={(_, value) => setPosition(value)}
                />
                <Typography variant="caption" component="span">
                    {`${formatDuration(position)} / ${formatDuration(duration)}`}
                </Typography>
            </SliderDiv>
            <div className="music-controls">
                <CustomWidthTooltip title="Previous Track" placement="bottom-end">
                    <StyledIconButton
                        onClick={() => {
                            let previousIndex = currentTrackIndex - 1;

                            if (previousIndex < 0) {
                                previousIndex = tracks.length - 1;
                            }
                            updateCurrentTrackIndex(previousIndex);

                            const trackDetails = getTrackDetails(tracks.at(previousIndex));
                            updateCurrentTrackName(trackDetails.getTrackName());
                            updateCurrentTrackUrl(trackDetails.getTrackUrl());
                        }}
                    >
                        <SkipPreviousRounded/>
                    </StyledIconButton>
                </CustomWidthTooltip>
                <CustomWidthTooltip title="Seek Backward" placement="bottom-end">
                    <StyledIconButton
                        onClick={() => seekBackward(currentTrackRef)}
                    >
                        <FastRewindRounded/>
                    </StyledIconButton>
                </CustomWidthTooltip>
                <CustomWidthTooltip title={isPaused ? "Play" : "Pause"} placement="bottom-end">
                    <StyledIconButton 
                        onClick={() => {
                            isPaused 
                                ? play(currentTrackRef)
                                : pause(currentTrackRef);
                            setIsPaused(!isPaused);
                        }}
                    >
                        {isPaused 
                            ? <PlayArrowRounded/> 
                            : <PauseRounded/>
                        }
                    </StyledIconButton>
                </CustomWidthTooltip>
                <CustomWidthTooltip title="Seek Forward" placement="bottom-end">
                    <StyledIconButton
                        onClick={() => seekForward(currentTrackRef)}
                    >
                        <FastForwardRounded/>
                    </StyledIconButton>
                </CustomWidthTooltip>
                <CustomWidthTooltip title="Next Track" placement="bottom-end">
                    <StyledIconButton
                        onClick={() => {
                            let nextIndex = currentTrackIndex + 1;

                            if (nextIndex >= tracks.length) {
                                nextIndex = 0;
                            }
                            updateCurrentTrackIndex(nextIndex);

                            const trackDetails = getTrackDetails(tracks.at(nextIndex));
                            updateCurrentTrackName(trackDetails.getTrackName());
                            updateCurrentTrackUrl(trackDetails.getTrackUrl());
                        }}
                    >
                        <SkipNextRounded/>
                    </StyledIconButton>
                </CustomWidthTooltip>
            </div>
            <SliderDiv>
                <CustomWidthTooltip title={isVolumeMuted ? "Unmute" : "Mute"} placement="bottom-end">
                    <StyledIconButton
                        sx={{ padding: 0 }}
                        onClick={() => {
                            if (isVolumeMuted) {
                                setVolume(100);
                                updateVolume(currentTrackRef, 100);
                            } else {
                                setVolume(0);
                                updateVolume(currentTrackRef, 0);
                            }
                        }}
                    >
                        {renderVolumeIcon(volume)}
                    </StyledIconButton>
                </CustomWidthTooltip>
                <CustomWidthTooltip title={volume} placement="right">
                    <Slider
                        sx={{ width: "30%" }}
                        value={volume}
                        min={0}
                        step={5}
                        max={100}
                        onChange={(_, value) => {
                            setVolume(value);
                            updateVolume(currentTrackRef, volume);
                        }}
                    />
                </CustomWidthTooltip>
            </SliderDiv>
        </div>
    );
}
