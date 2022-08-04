import '../../styles/App.css';
import CssBaseline from '@mui/material/CssBaseline';
import MusicPlayer from './MusicPlayer';
import AppBottomNavigation from './AppBottomNavigation';

function App() {
  return (
    <div id="app">
      <CssBaseline/>
      <MusicPlayer/>
      <AppBottomNavigation/>
    </div>
  );
}

export default App;
