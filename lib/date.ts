import dayjs from 'dayjs';

export const dateConverter = (timestamp: Date): string => {
  const date: Date = new Date(timestamp);
  const now: Date = new Date();

  const diff: number = date.getTime() - now.getTime();
  const diffInSeconds: number = Math.abs(diff) / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  if (diff < 0) {
    // Past dates
    switch (true) {
      case diffInDays > 7:
        return `${Math.floor(diffInDays / 7)} weeks ago`;
      case diffInDays >= 1 && diffInDays <= 7:
        return `${Math.floor(diffInDays)} days ago`;
      case diffInHours >= 1:
        return `${Math.floor(diffInHours)} hours ago`;
      case diffInMinutes >= 1:
        return `${Math.floor(diffInMinutes)} minutes ago`;
      default:
        return 'Just now';
    }
  } else {
    // Future dates
    switch (true) {
      case diffInDays > 7:
        return `In ${Math.floor(diffInDays / 7)} weeks`;
      case diffInDays >= 1 && diffInDays <= 7:
        return `In ${Math.floor(diffInDays)} days`;
      case diffInHours >= 1:
        return `In ${Math.floor(diffInHours)} hours`;
      case diffInMinutes >= 1:
        return `In ${Math.floor(diffInMinutes)} minutes`;
      default:
        return 'Just now';
    }
  }
};



export const formatTimestamp = (timestamp: Date): string => {
  return dayjs(timestamp).format('D MMM. YYYY, h:mm A');
};