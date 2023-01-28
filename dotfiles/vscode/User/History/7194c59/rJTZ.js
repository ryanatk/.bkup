import axios from 'axios';
import JWT_TOKEN from '../const/JWT';

const setAuthorizationHeader = () => {
  const jwtToken = sessionStorage.getItem(JWT_TOKEN);

  console.log({ axios });

  if (jwtToken != null) {
    // TODO: This doesn't work - says axios.defaults.headers is undefined
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
  }
};

export default setAuthorizationHeader;
