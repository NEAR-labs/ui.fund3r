import axios from 'axios';

const API_HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

const getAllGrantApplicationsOfUser = async () => {
  const { data } = await axios.get(API_HOST + '/grants');

  return data;
};

export { getAllGrantApplicationsOfUser };
