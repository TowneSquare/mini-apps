// "use client";
import { useEffect, useMemo, useState } from "react";
interface TimeInfo {
  day: number;
  hours: number;
  hoursStr: string;
  minutes: number;
  minutesStr: string;
  seconds: number;
  secondsStr: string;
  status: TimeStatus;
}
export enum TimeStatus {
  PENDING,
  RUNNING,
  END,
}
export interface CountDownOptions {
  deadlineTime: number;
}

const formate = (time: number): string => {
  return `${time < 10 ? "0" : ""}${time}`;
};

const clearCountdownInfo = (status?: TimeInfo["status"]): TimeInfo => {
  const timeInfo: TimeInfo = {
    day: 0,
    hours: 0,
    hoursStr: "00",
    minutes: 0,
    minutesStr: "00",
    seconds: 0,
    secondsStr: "00",
    status: status || TimeStatus.END,
  };
  return timeInfo;
};

const computeRemainTime = (deadlineTime: number) => {
  const nowTime = Date.now();
  const remainTime = (deadlineTime - nowTime) / 1000;
  return remainTime;
};

const computeCountdownInfo = (remainTime: number): TimeInfo => {
  if (remainTime < 0) {
    return clearCountdownInfo();
  }

  const day = Math.floor(remainTime / (24 * 60 * 60));
  const hours = Math.floor((remainTime / (60 * 60)) % 24);
  const hoursStr = formate(hours);
  const minutes = Math.floor((remainTime / 60) % 60);
  const minutesStr = formate(minutes);
  const seconds = Math.floor(remainTime % 60);
  const secondsStr = formate(seconds);

  const timeInfo: TimeInfo = {
    day,
    hours,
    hoursStr,
    minutes,
    minutesStr,
    seconds,
    secondsStr,
    status: TimeStatus.RUNNING,
  };

  return timeInfo;
};

const createCountdown = (
  setTimeInfo: (timeInfo: TimeInfo) => void,
  options: CountDownOptions,
) => {
  let timer = 0;
  const countdown = () => {
    const remainTime = computeRemainTime(options.deadlineTime);
    if (remainTime > 0) {
      timer = window.setTimeout(countdown, 1000);
    }
    const data = computeCountdownInfo(remainTime);
    setTimeInfo(data);
  };
  const getTimer = () => timer;
  return { getTimer, countdown };
};

export const useCountdown = (options: CountDownOptions) => {
  const [timeInfo, setTimeInfo] = useState<TimeInfo>(
    clearCountdownInfo(TimeStatus.PENDING),
  );

  // const remainTime = useMemo(
  //   () => computeRemainTime(options.deadlineTime),
  //   [options.deadlineTime],
  // );

  // const [timeInfo, setTimeInfo] = useState<TimeInfo>(
  //   computeCountdownInfo(remainTime),
  // );

  useEffect(() => {
    const { countdown, getTimer } = createCountdown(setTimeInfo, options);
    countdown();
    return () => {
      getTimer() && clearTimeout(getTimer());
    };
  }, [options.deadlineTime]);
  return timeInfo;
};
