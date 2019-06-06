import fetch from '@/config/fetch'


export const getUserList = data => fetch('wcdog/user/userlist', data);

