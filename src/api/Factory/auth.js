import axiosClient from "@/api/index";

const authApi = {
  facebookLogin: (token) => {
    return axiosClient.post(`/facebook-login?access_token=${token}`);
  },
  googleLogin: (token) => {
    return axiosClient.post(`/google-login?id_token=${token}`);
  },
  githubLogin: (code) => {
    return axiosClient.post(`/github-login?code=${code}`);
  },
};

export default authApi;
