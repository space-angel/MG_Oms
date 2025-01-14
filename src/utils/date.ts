export const formatTime = (timeString: string) => {
  const date = new Date(timeString);
  return date.toLocaleTimeString('ko-KR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const getTimeSlot = (dateString: string) => {
  return new Date(dateString).getHours().toString();
}; 