import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getCoursesPaging, deleteCourse } from "@/services/course.api";
import type { Course } from "@/types/course";

interface CoursesState {
  items: Course[];
  page: number;
  totalPages: number;
  totalItems: number; // ✅ thêm tổng số khoá học
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  items: [],
  page: 1,
  totalPages: 1,
  totalItems: 0, // ✅ khởi tạo
  loading: false,
  error: null,
};

export const searchCoursesThunk = createAsyncThunk(
  "courses/search",
  async (keyword: string, { rejectWithValue }) => {
    try {
      // Gọi API không phân trang, lấy tất cả khóa học theo keyword
      // API của bạn có endpoint này chưa? Nếu chưa, gọi getCoursesPaging với pageSize thật lớn
      const response = await getCoursesPaging(1, 9999, keyword);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Lấy danh sách khoá học có phân trang
export const fetchCoursesPagingThunk = createAsyncThunk(
  "courses/fetchPaging",
  async (
    {
      page,
      pageSize,
      keyword,
    }: { page: number; pageSize: number; keyword?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getCoursesPaging(page, pageSize, keyword);

      // 👉 Một số backend trả về kiểu khác nhau, ta normalize dữ liệu tại đây
      return {
        items:
          response.items ||
          response.itemsPaging ||
          response.data ||
          response.itemsData ||
          [],
        totalPages:
          response.totalPages ||
          Math.ceil(
            (response.totalCount || response.totalItems || 0) / pageSize
          ) ||
          1,
        totalItems:
          response.totalCount || response.totalItems || response.totalRow || 0,
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Xoá khoá học
export const deleteCourseThunk = createAsyncThunk(
  "courses/delete",
  async (maKhoaHoc: string, { rejectWithValue }) => {
    try {
      await deleteCourse(maKhoaHoc);
      return maKhoaHoc;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ✅ Fetch courses
    builder
      .addCase(fetchCoursesPagingThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursesPagingThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems; // ✅ thêm dòng này
      })

      .addCase(fetchCoursesPagingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ✅ Delete course
    builder
      .addCase(deleteCourseThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (course) => course.maKhoaHoc !== action.payload
        );
        state.totalItems -= 1; // ✅ Giảm tổng khi xóa
      })
      .addCase(deleteCourseThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setPage } = courseSlice.actions;
export default courseSlice.reducer;
