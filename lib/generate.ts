export const generateOrderId = (): string => {
    const prefix = "WF-";
    const randomNumber = Math.floor(100 + Math.random() * 900).toString();
    const formattedNumber = `${prefix}${randomNumber}`;
    return formattedNumber;
  };
