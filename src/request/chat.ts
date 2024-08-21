import http from '.';

export async function getRecentChatList(params: {page: number}) {
  const res = await http.post('/adminapi/chat/user/recentusers', params);
  const {data} = res;
  return data;
}

export async function getChat(params: {uid: string}) {
  const res = await http.post('/adminapi/chat/user/currentuser', params);
  console.log(res);

  const {data} = res;
  return data;
}
