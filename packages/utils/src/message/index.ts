export interface IMessage {
  date: number,
  userName: string,
  message: string,
}

interface loginResponse {
  date: number,
  loginStatus: boolean,
  message: string
}


export const loginKey = "$iShouldMakeTheLoginAbitSafer"

export const createMessage = (message: string, userName: string = 'anonymous'): IMessage => {
  const date = Date.now();
  return ({ message, userName, date });
};

export const loginMessage = (userName: string): IMessage => {
  const date = Date.now();
  return ({ message: loginKey, userName, date });
};

export const validLoginResponse = () => {
  const date = Date.now();

  return ({ message: loginKey, loginStatus: true, date })
}
