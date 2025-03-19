export type dataHistory = {
  id: number;
  myname: string;
  nameuser: string;
  message: string;
  created_at: string;
  read: boolean;
  mymessage: boolean;
};

export function dataDBAForData(data: dataHistoryDBA[], myId: string, myUsername: string, username: string): dataHistory[] {
  const response: dataHistory[] = [];

  data.forEach((el) => {
    if (el.user_id_one == myId)
      response.push({
        id: el.id,
        myname: myUsername,
        nameuser: username,
        message: el.message,
        created_at: el.created_at,
        read: el.read,
        mymessage: true,
      });
    else
      response.push({
        id: el.id,
        myname: myUsername,
        nameuser: username,
        message: el.message,
        created_at: el.created_at,
        read: el.read,
        mymessage: false,
      });
  });

  return response;
}

export type dataHistoryDBA = {
  id: number;
  user_id_one: string;
  user_id_two: string;
  message: string;
  created_at: string;
  read: boolean;
};

export type searchProfileResponse = {
  picture: string;
  name: string;
  username: string;
};
