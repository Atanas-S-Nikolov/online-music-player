import { useState } from 'react';

import { Box, BottomNavigation, BottomNavigationAction, styled } from '@mui/material';
import { MusicNoteRounded, PlaylistAddRounded, SettingsRounded } from '@mui/icons-material';

export default function AppBottomNavigation() {
  const [value, setValue] = useState(0);

  const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
    background: theme.palette.background.default,
    borderRadius: "10px"
  }));

  const StyledBottomNavAction = styled(BottomNavigationAction)(({ theme }) => ({
    color: theme.palette.secondary.main,
    borderRadius: "10px"
  }));

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
        <StyledBottomNavAction label="Music Player" icon={<MusicNoteRounded />} />
        <StyledBottomNavAction label="Add Track" icon={<PlaylistAddRounded />} />
        <StyledBottomNavAction label="Options" icon={<SettingsRounded />} />
      </StyledBottomNavigation>
    </Box>
  );
}
