import { useState } from "react";

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
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
}

export default function MusicPlayer() {
    const duration = 188; //seconds
    const [position, setPosition] = useState(0);
    const[volume, setVolume] = useState(100);
    const [isPaused, setIsPaused] = useState(false);

    let isVolumeMuted = volume === 0;

    return(
        <div id="music-player">
            <Typography variant="h6">Papa Roach - ...To Be Loved</Typography>
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
                    <StyledIconButton>
                        <SkipPreviousRounded/>
                    </StyledIconButton>
                </CustomWidthTooltip>
                <CustomWidthTooltip title="Seek Backward" placement="bottom-end">
                    <StyledIconButton>
                        <FastRewindRounded/>
                    </StyledIconButton>
                </CustomWidthTooltip>
                <CustomWidthTooltip title={isPaused ? "Play" : "Pause"} placement="bottom-end">
                    <StyledIconButton 
                        onClick={() => setIsPaused(!isPaused)}
                    >
                        {isPaused 
                            ? <PlayArrowRounded/> 
                            : <PauseRounded/>
                        }
                    </StyledIconButton>
                </CustomWidthTooltip>
                <CustomWidthTooltip title="Seek Forward" placement="bottom-end">
                    <StyledIconButton>
                        <FastForwardRounded/>
                    </StyledIconButton>
                </CustomWidthTooltip>
                <CustomWidthTooltip title="Next Track" placement="bottom-end">
                    <StyledIconButton>
                        <SkipNextRounded/>
                    </StyledIconButton>
                </CustomWidthTooltip>
            </div>
            <SliderDiv>
                <CustomWidthTooltip title={isVolumeMuted ? "Unmute" : "Mute"} placement="bottom-end">
                    <StyledIconButton
                        sx={{ padding: 0 }}
                        onClick={() => {
                            isVolumeMuted
                                ? setVolume(100)
                                : setVolume(0)
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
                        onChange={(_, value) => setVolume(value)}
                    />
                </CustomWidthTooltip>
            </SliderDiv>
        </div>
    );
}
