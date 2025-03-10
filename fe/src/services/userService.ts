import axios from 'axios';
import { User } from '@/types/User'; // Đảm bảo đường dẫn đúng
import { getToken } from '@/utils/auth'; // This should work now

const API_URL = 'http://localhost:5000/api'; // Ensure this is correct

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// export const getUsers = async () => {
//     return await axiosInstance.get<User[]>('/users');
// };

// export const addUser = async (user: User) => {
//     return await axiosInstance.post<User>('/users', user);
// };

// export const updateUser = async (id: string, user: User) => {
//     return await axiosInstance.put<User>(`/users/${id}`, user);
// };

// export const deleteUser = async (id: string) => {
//     return await axiosInstance.delete(`/users/${id}`);
// };

// Define a type for the API response
interface GetAllTeachersResponse {
    data: {
        teachers: User[]; // Assuming User is the type for a teacher
    };
}

// GET ALL TEACHERS
export const getAllTeachers = async () => {
    try {
        const { data } = await axiosInstance.get<GetAllTeachersResponse>('/users/teachers'); // Ensure this endpoint is correct
        return data.data.teachers; // Access the teachers array
    } catch (error) {
        console.log(error);
        return []; // Return an empty array on error
    }
};
