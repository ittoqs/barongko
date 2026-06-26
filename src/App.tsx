import { useState, useEffect } from 'react';
import UbuntuOS from './components/Desktop/UbuntuOS';
import AndroidOS from './components/Mobile/AndroidOS';

function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop ? <UbuntuOS /> : <AndroidOS />;
}

export default App;
