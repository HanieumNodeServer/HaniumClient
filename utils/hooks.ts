import {useInterval} from './index';
import {useState} from 'react';
import {useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';

type recordingCheckType = (
  newText: string,
  callback: () => void,
  speechStarted: boolean,
) => void;

export const useRecordingCheck: recordingCheckType = (
  newText,
  callback,
  speechStarted,
) => {
  let oldText: string;

  useInterval(
    () => {
      if (newText && oldText === newText) {
        callback();
      } else if (newText) {
        oldText = newText;
      }
    },
    speechStarted ? 2000 : null,
  );
};

export const useIsForeground = (): boolean => {
  const [isForeground, setIsForeground] = useState(true);

  useEffect(() => {
    const onChange = (state: AppStateStatus): void => {
      setIsForeground(state === 'active');
    };
    const listener = AppState.addEventListener('change', onChange);
    return () => listener.remove();
  }, [setIsForeground]);

  return isForeground;
};
