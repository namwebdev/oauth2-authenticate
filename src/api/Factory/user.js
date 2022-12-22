import axiosClient from "@/api/index";

const userApi = {
  getUser: () => {
    return axiosClient.get(`/me`);
  },
};

export default userApi;
