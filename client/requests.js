import axios from "axios";

let dev = "production" !== "production";
const DEV_BASE_URL = "https://gpchest-new2.vercel.app/";
const PROD_BASE_URL = "https://gpchest-new2.vercel.app/";

const BASE_URL = dev ? DEV_BASE_URL : PROD_BASE_URL;

export const createPost = async (form) => {
  try {
    const res = await axios.post(`/api/posts/create`, form);
    return res;
  } catch (err) {
    return err.response;
  }
};

// this runs on the server; thats y i used .env variables
export const getPosts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/posts`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getPost = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/posts/${id}`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const deletePost = async (id) => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const createGoldPrice = async (form) => {
  try {
    const res = await axios.post(`/api/gold/`, form);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getGoldPrices = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/gold`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getGoldPrice = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/gold/${id}`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const deleteGold = async (id) => {
  try {
    const res = await axios.delete(`/api/gold/${id}`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const updateGoldPrice = async (id, form) => {
  try {
    const res = await axios.put(`/api/gold/${id}`, form);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getSpecificGoldPrice = async (type, trade) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/gold/${type}/${trade}`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const createAccount = async (form) => {
  try {
    const res = await axios.post(`/api/accounts/create`, form);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getAccounts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/accounts/`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getAccount = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/accounts/${id}`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const deleteAccount = async (id) => {
  try {
    const res = await axios.delete(`/api/accounts/${id}`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const updateAccount = async (id, form) => {
  try {
    const res = await axios.put(`/api/accounts/${id}`, form);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const createReview = async (form) => {
  try {
    const res = await axios.post(`/api/reviews`, form);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getReviews = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/reviews/`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getRandomReviews = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/reviews/random`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const deleteReview = async (id) => {
  try {
    const res = await axios.delete(`/api/reviews/${id}`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getUser = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/users`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const updateUser = async (id, user) => {
  try {
    const res = await axios.put(`/api/users/${id}`, user);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getRandomBlogs = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/posts/random`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const makePayment = async (order) => {
  try {
    const res = await axios.post(`/api/payment`, order);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const createOrder = async (order) => {
  try {
    const res = await axios.post(`/api/orders`, order);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getOrders = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/orders`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const updateOrder = async (id, state) => {
  try {
    const res = await axios.put(`/api/orders/${id}`, state);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const deleteOrder = async (id) => {
  try {
    const res = await axios.delete(`/api/orders/${id}`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getOrder = async (customer) => {
  try {
    const res = await axios.get(`/api/orders/email/${customer}`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const signUp = async (customer) => {
  try {
    const res = await axios.post(`/api/users`, customer);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const signIn = async (customer) => {
  try {
    const res = await axios.post(`/api/users/auth`, customer);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const sendResetPassword = async (email) => {
  try {
    const res = await axios.post(`/api/reset`, { email });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const validatedResetResponse = async (email, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/reset/reset`, {
      email,
      token,
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const changePassword = async (email, password) => {
  try {
    const res = await axios.put(`/api/reset/change-password`, {
      email,
      password,
    });

    return res;
  } catch (err) {
    return err.response;
  }
};
