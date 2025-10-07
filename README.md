# QR Code Generator - SEOTOOL360

Công cụ tạo mã QR nâng cao với nhiều tính năng chuyên nghiệp.

## Tính năng

- ✅ Tạo mã QR cho nhiều loại dữ liệu:
  - Website/URL
  - Số điện thoại
  - Vị trí Google Maps
  - Danh thiếp VCard
  - Cấu hình WiFi
  
- 🎨 Tùy chỉnh giao diện:
  - Màu sắc tùy chỉnh
  - Nhiều kiểu pattern
  - Thêm logo vào QR code
  
- 📊 Thống kê và phân tích
- 🌍 Đa ngôn ngữ (Tiếng Việt / English)
- 💾 Tải xuống PNG/SVG

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

## Chạy ứng dụng

### Chạy với HTTP (mặc định):
```bash
npm run dev
```
Ứng dụng sẽ mở tại: **http://localhost:3000**

### Chạy với HTTPS:
```bash
npm run dev:https
```
- Lần đầu chạy sẽ tự động tạo certificate
- Ứng dụng sẽ mở tại: **https://localhost:3000**
- Trình duyệt sẽ cảnh báo "Not Secure" (bình thường với self-signed cert)
- Click "Advanced" → "Proceed to localhost" để tiếp tục

### Tạo certificate thủ công:
```bash
npm run generate-cert
```

## Build production

```bash
npm run build
```

## Công nghệ sử dụng

- React 18
- TypeScript
- Vite
- Tailwind CSS
- QRCode.js
- Lucide React (icons)

## License

MIT

