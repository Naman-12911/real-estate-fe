import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { useSelector } from 'react-redux';

const nativeAppStatusBar = () => {
  const isDarkMode = useSelector(state => state.theme.theme); // Assuming you have a theme slice in your Redux store

  useEffect(() => {
    const updateStatusBar = async () => {
      if (Capacitor.isNativePlatform()) {
        await StatusBar.show(); // Ensure the status bar is always visible
		await StatusBar.setOverlaysWebView({ overlay: false }); // Make sure the status bar does not overlay the webview
        
        await StatusBar.setBackgroundColor({
          color: isDarkMode ? '#182236' : '#FFFFFF', // Set the color based on the theme
        });

        await StatusBar.setStyle({
          style: isDarkMode ? Style.Dark : Style.Light, // Set the status bar style based on the theme
        });
      }
    };

    updateStatusBar();
  }, [isDarkMode]);
};

export default nativeAppStatusBar;