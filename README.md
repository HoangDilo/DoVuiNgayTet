# DoVuiNgayTet
## Các quy ước:
  Directory '/src' sẽ đổi thành '@', tất cả các import sẽ dùng '@' để có chung đường dẫn tuyệt đối (sau này đổi vị trí các file thì không bị lỗi not found)
  
  Folder _assets_: Để chứa các file ảnh png, jpg và svg
  
  Folder _api_: Để viết các hàm làm việc vối backend
  
  Folder _components_: Chứa các component sử dụng trong app
  
  Folder _constants_: Chứa các constant (lưu ở dạng .constant.ts)
  
  Folder _layout_: Chứa các layout cho các route

  Folder _pages_: Chứa các trang chính của app

  Folder _styles_: Chứa các file scss để viết style

  Folder _type_: Chứa các interface để gán kiểu ở các file khác (dùng nhiều nhất khi định nghĩa kiểu trả về của api)

  **Lưu ý**: Khi lập trình 1 page thì tạo folder tên page, tạo file index.tsx là component đại diện cho page đó; các style liên quan tới page đó sẽ nhét trong folder của page đó luôn (không để vào folder _styles_)
