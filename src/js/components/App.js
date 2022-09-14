import { useState, createRef } from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import MusicPlayer from './MusicPlayer';
import AppBottomNavigation from './AppBottomNavigation';
import TrackContext from '../utils/TrackContext';

import '../../styles/App.css';

function App() {
  const trackRef = createRef();
  const initialComponent = <MusicPlayer/>
  const [component, setComponent] = useState(initialComponent);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTrackName, setCurrentTrackName] = useState("Music Player Extension");
  const [currentTrackUrl, setCurrentTrackUrl] = useState("");
  const [tracks, setTracks] = useState([]);

  const handleCallback = (componentFromChild) => {
    setComponent(componentFromChild);
  }

  const updateCurrentTrackIndex = (index) => {
    setCurrentTrackIndex(index);
  }

  const updateCurrentTrackName = (trackName) => {
    setCurrentTrackName(trackName);
  }

  const updateCurrentTrackUrl = (trackUrl) => {
    setCurrentTrackUrl(trackUrl);
  }

  const updateTracks = (tracks) => {
    setTracks(tracks);
  }

  return (
    <div id="app">
      <CssBaseline/>
      <TrackContext.Provider value={{
        currentTrackRef: trackRef,
        currentTrackIndex: currentTrackIndex,
        currentTrackName: currentTrackName,
        currentTrackUrl: currentTrackUrl,
        tracks: tracks,
        updateCurrentTrackIndex: updateCurrentTrackIndex,
        updateCurrentTrackName: updateCurrentTrackName,
        updateCurrentTrackUrl: updateCurrentTrackUrl,
        updateTracks: updateTracks
      }}>
        {component}
        <video src={currentTrackUrl} ref={trackRef} style={{ display: "none" }}/>
        <AppBottomNavigation 
          initialComponent={initialComponent} 
          parentCallback={handleCallback}
        />
      </TrackContext.Provider>
    </div>
  );
}

export default App;
