function getTimeMap(timestamp: number, isMsec?: boolean) {
  if (!timestamp) {
    timestamp = 0;
  }
  const date = new Date(timestamp * (isMsec ? 1 : 1000)); // 转换为毫秒
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
  };
}

/**
 * @param timestamp 时间戳 秒
 * @returns yyyy.mm.dd
 */
export function formatTimestamp(timestamp: number) {
  if (!timestamp) return '';
  const {year, month, day} = getTimeMap(timestamp);
  return `${year}.${month}.${day}`;
}

/**
 * @param timestamp 时间戳 秒
 * @returns yyyy-MM-dd HH:mm:ss
 */
export function formatTimestamp2(timestamp: number) {
  if (!timestamp) return '';
  const {year, month, day, hour, minute, second} = getTimeMap(timestamp);
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

/**
 * @param timestamp 时间戳 秒
 * @returns HH:mm:ss
 */
export function formatTimestamp7(timestamp: number) {
  if (!timestamp) return '';
  const {year, month, day, hour, minute, second} = getTimeMap(timestamp);
  return `${hour}:${minute}:${second}`;
}

/**
 * @param timestamp 时间戳 秒
 * @returns yyyy/MM/dd HH:mm
 */
export function formatTimestamp3(timestamp: number) {
  if (!timestamp) return '';
  const {year, month, day, hour, minute} = getTimeMap(timestamp);
  return `${year}/${month}/${day} ${hour}:${minute}`;
}

/**
 * @param timestamp 时间戳 秒
 * @returns yyyy-mm
 */
export function formatTimestamp4(timestamp: number) {
  const {year, month} = getTimeMap(timestamp);
  return `${year}-${month}`;
}

/**
 * @param timestamp 时间戳 秒
 * @returns DD:HH:mm:ss
 */
export function formatTimestamp5(timestamp: number) {
  // 将毫秒转换为秒
  const seconds = Math.floor(timestamp / 1000);

  // 计算剩余的天数、小时、分钟和秒
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const dayStr = (days < 10 ? '0' : '') + days;
  const hoursStr = (hours < 10 ? '0' : '') + hours;
  const minutesStr = (minutes < 10 ? '0' : '') + minutes;
  const remainingSecondsStr =
    (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
  return `${dayStr}:${hoursStr}:${minutesStr}:${remainingSecondsStr}`;
}

/**
 * @param timestamp 时间戳 秒
 * @returns yyyy-mm-dd
 */
export function formatTimestamp6(timestamp: number) {
  const {year, month, day} = getTimeMap(timestamp);
  return `${year}-${month}-${day}`;
}

export function getCurrentTimeMap(timestamp: number, isMsec?: boolean) {
  if (!timestamp) {
    timestamp = 0;
  }
  const date = new Date(timestamp * (isMsec ? 1 : 1000)); // 转换为毫秒
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
  };
}
