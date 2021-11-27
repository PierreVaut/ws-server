export interface IMessage {
  date: number,
  userName: string,
  message: string
}

export const createMessage = (message: string, userName: string = 'anonymous'): IMessage => {
  const date = Date.now();
  return ({ message, userName, date });
};
