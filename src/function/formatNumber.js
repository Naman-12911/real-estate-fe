import { useCallback } from 'react';

const useFormatNumber = () => {
  const formatNumber = useCallback((num) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + 'B';
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + 'M';
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + 'K';
    }
    return num?.toString();
  }, []);

  return { formatNumber };
};

export default useFormatNumber;