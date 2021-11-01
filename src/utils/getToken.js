import Cookies from 'js-cookie';
import jwt from 'jwt-decode';

const getTokenObj = () => {
  if (Cookies.get('ravenHealthAccessToken')) {     
    const tokenObj = jwt(JSON.parse(Cookies.get('ravenHealthAccessToken'))); // decode token here
    return {
      user_id: tokenObj.user.id,
      accessToken: JSON.parse(Cookies.get('ravenHealthAccessToken'))
    }
  }
  return null;
};
export default getTokenObj;