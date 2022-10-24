// store/userSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = {
  "idAcc": 2,
  "title": "",
  "first_name": "Ilysa",
  "last_name": "Philcott",
  "email": "iphilcott1@webs.com",
  "password": "AgVdMF",
  "phone": "7613685691",
  "address": "4996 Autumn Leaf Pass",
  "gender": "Female",
  "Bday": "4/21/2022",
  "role":0
};

// Cấu hình slice
export const userSlice = createSlice({
  name: "user",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  reducers: {
    // Hàm có 2 tham số là state hiện tại và action truyền vào
    updateCustomer: (state, action) => {
      // Cập nhật state username với giá trị truyền vào qua action (action.payload)
      // Chạy thử console.log(action) để xem chi tiết giá trị action truyền vào
      state.idAcc = action.payload.idAcc;
      state.title = action.payload.title;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;

      state.password = action.payload.password;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.gender = action.payload.gender;

      state.Bday = action.payload.Bday;
      state.role = action.payload.role;
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const { updateCustomer } = userSlice.actions;

// Action là 1 hàm trả về object dạng {type, payload}, chạy thử console.log(updateUsername()) để xem chi tiết

// Hàm giúp lấy ra state mong muốn.
// Hàm này có 1 tham số là root state là toàn bộ state trong store, chạy thử console.log(state) trong nội dung hàm để xem chi tiết
export const selectCustomer = state => state.user;

// Export reducer để nhúng vào Store
export default userSlice.reducer;