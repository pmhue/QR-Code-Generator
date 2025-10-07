# HƯỚNG DẪN CÀI ĐẶT VÀ SỬ DỤNG

## Yêu cầu hệ thống

- Node.js phiên bản 16 trở lên
- npm hoặc yarn

## Các bước cài đặt

### Bước 1: Cài đặt Node.js (nếu chưa có)

Tải và cài đặt Node.js từ: https://nodejs.org/

### Bước 2: Cài đặt các thư viện cần thiết

Mở terminal/command prompt trong thư mục project và chạy lệnh:

```bash
npm install
```

Lệnh này sẽ tự động cài đặt tất cả các thư viện cần thiết:
- React và React DOM
- TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- QRCode.js (tạo mã QR)
- Lucide React (icons)

### Bước 3: Chọn chế độ chạy

#### Option 1: HTTP (Khuyên dùng cho development nhanh)

```bash
npm run dev
```

Ứng dụng sẽ tự động mở tại: **http://localhost:3000**

#### Option 2: HTTPS (Cho tính năng cần bảo mật)

```bash
npm run dev:https
```

- Lần đầu chạy sẽ tự động tạo self-signed certificate
- Ứng dụng sẽ mở tại: **https://localhost:3000**
- Trình duyệt sẽ cảnh báo về certificate không tin cậy (bình thường)
- Click "Advanced" → "Proceed to localhost" để tiếp tục

#### Tạo certificate thủ công (nếu cần)

```bash
npm run generate-cert
```

## Cách sử dụng

### 1. Chọn loại mã QR

- **Website/URL**: Nhập địa chỉ website
- **Số điện thoại**: Nhập số điện thoại
- **Vị trí Google Maps**: Dán link Google Maps
- **Danh thiếp VCard**: Nhập thông tin cá nhân/công ty
- **Cấu hình WiFi**: Nhập tên và mật khẩu WiFi

### 2. Tùy chỉnh giao diện

- Chọn màu cho mã QR và nền
- Chọn kiểu pattern (Vuông, Chấm tròn, Bo tròn)
- Tải logo lên (nếu muốn)
- Điều chỉnh kích thước logo

### 3. Tạo mã QR

Nhấn nút **"Tạo mã QR"**

### 4. Tải xuống

- **Tải PNG**: Tải về dạng ảnh PNG
- **Tải SVG**: Tải về dạng vector SVG

### 5. Xem thống kê

Xem số lượng mã QR đã tạo và phân loại theo từng loại

## Chuyển đổi ngôn ngữ

Nhấn nút **VI/EN** ở góc trên bên phải để chuyển đổi giữa Tiếng Việt và Tiếng Anh

## Build cho production

Để build ứng dụng cho môi trường production:

```bash
npm run build
```

File build sẽ được tạo trong thư mục `dist/`

## Preview bản build

Để xem trước bản build:

```bash
npm run preview
```

## Xử lý lỗi thường gặp

### Lỗi "npm: command not found"
- Chưa cài đặt Node.js
- Giải pháp: Cài đặt Node.js từ https://nodejs.org/

### Lỗi "Port 3000 is already in use"
- Port 3000 đang được sử dụng bởi ứng dụng khác
- Giải pháp: Đóng ứng dụng đang dùng port 3000 hoặc thay đổi port trong file `vite.config.ts`

### Lỗi khi cài đặt packages
- Kết nối internet không ổn định
- Giải pháp: Thử lại lệnh `npm install` hoặc xóa thư mục `node_modules` và file `package-lock.json` rồi cài lại

## Hỗ trợ

Nếu gặp vấn đề, vui lòng kiểm tra:
1. Phiên bản Node.js (chạy `node --version`)
2. Log lỗi trong terminal
3. Console của trình duyệt (F12)

---

Chúc bạn sử dụng thành công! 🎉

