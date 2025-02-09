import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import {SafeArea} from 'capacitor-plugin-safe-area';

export const nativeSafeAreaView = () => {
	const [statusBarHeight, setStatusBarHeight] = useState(0);

	useEffect(() => {
	  const getStatusBarHeight = async () => {
		if (Capacitor.isNativePlatform()) {
		  const safeAreaInsets = await SafeArea.getStatusBarHeight();
		  setStatusBarHeight(safeAreaInsets);
		}
	  };
  
	  getStatusBarHeight();
	}, []);

  return statusBarHeight;
};