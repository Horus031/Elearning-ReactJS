import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersPaging } from "@/services/user.api";
import type { User } from "@/types/user";
import { updateUser } from "../../services/userService";
import { searchUsers } from "../../services/userService";
import { deleteUser } from "@/services/userService";
import { addUser } from "@/services/user.api";
import type { RootState } from "@/store/store";

// Gọi API phân trang qua Redux thunk
export const fetchUsersPaging = createAsyncThunk(
  "users/fetchUsersPaging",
  async (
    {
      page,
      pageSize,
      keyword,
    }: { page: number; pageSize: number; keyword: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await getUsersPaging(page, pageSize, keyword);
      return res.data; // chỉ cần items, totalPages (KHÔNG dùng currentPage)
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchUsersThunk = createAsyncThunk(
  "users/searchUsers",
  async (keyword: string, { rejectWithValue }) => {
    try {
      const res = await searchUsers(keyword); // ✅ gọi API backend đã xử lý
      return {
        items: res.data,
        totalPages: 1,
        totalItems: res.data.length,
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Search failed");
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  "users/deleteUser",
  async (taiKhoan: string, { getState, rejectWithValue }) => {
    try {
      await deleteUser(taiKhoan);

      const state: any = getState();
      const { page } = state.users;
      const pageSize = 10;

      const res = await getUsersPaging(page, pageSize);
      return res.data; // ✅ fix: chỉ return .data
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const addUserThunk = createAsyncThunk(
  "users/addUser",
  async (userData: any, { getState, rejectWithValue }) => {
    try {
      await addUser(userData); // gọi API thêm

      const { page } = (getState() as RootState).users;
      const pageSize = 10;

      const res = await getUsersPaging(page, pageSize);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.content || "Thêm người dùng thất bại"
      );
    }
  }
);

// ✅ Thêm totalItems vào UserState
interface UserState {
  users: User[];
  totalPages: number;
  totalItems: number; // ✅ thêm để không lỗi
  loading: boolean;
  page: number;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  totalPages: 1,
  totalItems: 0, // ✅ khởi tạo
  loading: false,
  page: 1,
  error: null,
};

export const updateUserThunk = createAsyncThunk(
  "users/updateUser",
  async (userData: any, { rejectWithValue }) => {
    try {
      const res = await updateUser(userData);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Chỉ dùng action này để đổi trang
    setPage: (state, action) => {
      state.page = action.payload;
    },
    // Cho phép set dữ liệu thủ công khi cần (không bắt buộc dùng)
    setUsers: (state, action) => {
      state.users = action.payload.items;
      state.totalPages = action.payload.totalPages;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersPaging.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersPaging.fulfilled, (state, action) => {
        console.log("API trả về items:", action.payload.items);
        state.loading = false;
        state.users = action.payload.items;
        state.totalPages = action.payload.totalPages;
        // KHÔNG gán state.page = action.payload.currentPage
      })
      // ✅ sửa chỗ này: dùng state.users thay vì state.items
      .addCase(searchUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload.items;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (u) => u.taiKhoan === updatedUser.taiKhoan
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(addUserThunk.fulfilled, (state, action) => {
        state.users = action.payload.items;
        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchUsersPaging.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.users = action.payload.items;
        state.totalPages = action.payload.totalPages;
      });
  },
});

export const { setPage, setUsers } = userSlice.actions;
export default userSlice.reducer;
