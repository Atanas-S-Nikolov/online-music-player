import { useState } from 'react';

import { Box, BottomNavigation, BottomNavigationAction, styled } from '@mui/material';
import { MusicNoteRounded, SettingsRounded, QueueMusicRounded } from '@mui/icons-material';

import Playlist from './Playlist';

export default function AppBottomNavigation(props) {
  const [value, setValue] = useState(0);
  const { initialComponent, parentCallback } = props;

  const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
    background: theme.palette.background.default,
    borderRadius: "10px"
  }));

  const StyledBottomNavAction = styled(BottomNavigationAction)(({ theme }) => ({
    color: theme.palette.secondary.main,
    borderRadius: "10px"
  }));

  const updateAppComponent = (component) => {
    parentCallback(component);
  }

  return (
    <Box sx={{
      width: "449px",
      marginLeft: -1.3,
      bottom: 0,
      position: "absolute"
    }}>
      <StyledBottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
      >
        <StyledBottomNavAction 
          label="Music Player"
          icon={<MusicNoteRounded />}
          onClick={() => updateAppComponent(initialComponent)}
        />
        <StyledBottomNavAction 
          label="Playlist"
          icon={<QueueMusicRounded />}
          onClick={() => updateAppComponent(<Playlist/>)}
        />
        <StyledBottomNavAction 
          label="Options"
          icon={<SettingsRounded />}
        />
      </StyledBottomNavigation>
    </Box>
  );
}
