import axios from "axios";

const API_BASE = "https://todoapp-12-pc6f.onrender.com/api";
// const API_BASE="http://localhost:5000/api";


// AXIOS INSTANCE

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});


// AUTH TOKEN HANDLER

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};


//REGISTER

export const registerUser = async (name: string, email: string) => {
  try {
    const res = await api.post("/auth/register", {
      name,
      email,
    });

    return res.data;
  } catch (error: any) {
    console.error("REGISTER ERROR 👉", error);
    throw new Error(
      error.response?.data?.message || "Registration failed"
    );
  }
};


//LOGIN (SEND OTP ONLY)

export const loginUser = async (email: string) => {
  try {
    const res = await api.post("/auth/login", { email });

    return res.data; // only message like "OTP sent"
  } catch (error: any) {
    console.error("LOGIN ERROR 👉", error);
    throw new Error(
      error.response?.data?.message || "OTP sending failed"
    );
  }
};


//  VERIFY OTP

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const res = await api.post("/auth/verify-otp", {
      email,
      otp,
    });

    const { token, _id, name } = res.data;

    if (!token) {
      throw new Error("Token not received from server");
    }

    const user = {
      _id,
      name,
      email,
    };

    // Save auth
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setAuthToken(token);

    return user;

  } catch (error: any) {
    console.log("FULL OTP ERROR 👉", error);

    // If backend sent a message
    if (error.response && error.response.data?.message) {
      throw new Error(error.response.data.message);
    }

    // Axios/network error fallback
    if (error.message) {
      throw new Error(error.message);
    }

    throw new Error("OTP verification failed");
  }
};


//TASKS (PROTECTED)


// GET ALL TASKS
export const getTasks = async () => {
  try {
    const res = await api.get("/tasks");
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch tasks"
    );
  }
};


// CREATE TASK
export const addTask = async (
  title: string,
  dueDate?: string,
  completed: boolean = false
) => {
  try {
    const res = await api.post("/tasks", {
      title,
      dueDate: dueDate || null,
      completed,
    });

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create task"
    );
  }
};


// UPDATE TASK
export const updateTask = async (id: string, updates: any) => {
  try {
    const res = await api.put(`/tasks/${id}`, updates);
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update task"
    );
  }
};


// DELETE TASK
export const deleteTask = async (id: string) => {
  try {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete task"
    );
  }
};

export default api;
