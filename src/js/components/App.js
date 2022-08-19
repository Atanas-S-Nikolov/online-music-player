import { useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import MusicPlayer from './MusicPlayer';
import AppBottomNavigation from './AppBottomNavigation';
import TrackContext from '../utils/TrackContext';

import '../../styles/App.css';

function App() {
  const [component, setComponent] = useState(<MusicPlayer/>);
  const [currentTrackUrl, setCurrentTrackUrl] = useState("");

  const handleCallback = (componentFromChild) => {
    setComponent(componentFromChild);
  }

  const updateCurrentTrackUrl = (trackUrl) => {
    setCurrentTrackUrl(trackUrl);
  }

  return (
    <div id="app">
      <CssBaseline/>
      <TrackContext.Provider value={{
        currentTrackUrl: currentTrackUrl,
        updateCurrentTrackUrl: updateCurrentTrackUrl
      }}>
        {component}
        <video src={currentTrackUrl} autoPlay style={{ display: "none" }}/>
        <AppBottomNavigation parentCallback={handleCallback}/>
      </TrackContext.Provider>
    </div>
  );
}

export default App;
