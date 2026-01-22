import axios from "axios";

const API_BASE = "http://localhost:5000/api";

/* =========================
   AXIOS INSTANCE
========================= */
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   AUTH TOKEN HANDLER
========================= */
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

/* =========================
   LOGIN
========================= */
// export const loginUser = async (email: string, password: string) => {
//   try {
//     const res = await api.post("/auth/login", { email, password });

//     const { token, user } = res.data;

//     // ✅ store token + user
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));

//     // ✅ set token for future requests
//     setAuthToken(token);

//     return user;
//   } catch (error: any) {
//     throw new Error(
//       error.response?.data?.message || "Login failed"
//     );
//   }
// };



// export const loginUser = async (email: string, password: string) => {
//   try {
//     const res = await api.post("/auth/login", { email, password });

//     const token = res.data.token;

//     if (!token) {
//       throw new Error("Token not received from server");
//     }

//     // ✅ Save token
//     localStorage.setItem("token", token);
//     setAuthToken(token);

//     // ✅ Try to get user (if backend sends it)
//     const user =
//       res.data.user ||
//       {
//         email,        // fallback
//         name: "User", // fallback
//       };

//     localStorage.setItem("user", JSON.stringify(user));

//     return user;
//   } catch (error: any) {
//     throw new Error(
//       error.response?.data?.message || "Login failed"
//     );
//   }
// };

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await api.post("/auth/login", { email, password });

    console.log("LOGIN RESPONSE 👉", res.data);

    // ✅ Normalize response
    const token =
      res.data.token || res.data.data?.token;

    const user =
      res.data.user ||
      res.data.data?.user || {
        name: res.data.name,
        email: res.data.email,
      };

    if (!token) {
      throw new Error("Token missing from response");
    }

    // ✅ Save auth
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setAuthToken(token);

    return user;
  } catch (error: any) {
    console.error("LOGIN ERROR 👉", error.response?.data || error.message);

    throw new Error(
      error.response?.data?.message ||
      error.message ||
      "Login failed"
    );
  }
};



/* =========================
   REGISTER
========================= */
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    // ❗ DO NOT auto-login here
    // After register → redirect to login page

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Registration failed"
    );
  }
};

/* =========================
   TASKS
========================= */

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
