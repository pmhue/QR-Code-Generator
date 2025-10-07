# Hướng dẫn cấu hình HTTPS

## Tự động (Khuyên dùng)

Chạy lệnh sau để tự động tạo certificate và chạy HTTPS:

```bash
npm run dev:https
```

## Thủ công

### Bước 1: Tạo self-signed certificate

**Windows:**
```bash
npm run generate-cert
```

**Linux/Mac:**
```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=VN/ST=HCM/L=HCM/O=HLHV/OU=Dev/CN=localhost"
```

Lệnh này sẽ tạo 2 file:
- `cert.pem` - Certificate
- `key.pem` - Private key

### Bước 2: Chạy dev server

```bash
npm run dev
```

Vite sẽ tự động phát hiện certificate và chạy HTTPS.

## Cách hoạt động

1. **Có certificate** (`cert.pem` và `key.pem`):
   - Chạy với HTTPS: `https://localhost:3000`
   - Secure connection (🔒)

2. **Không có certificate**:
   - Chạy với HTTP: `http://localhost:3000`
   - Standard connection

## Lưu ý bảo mật

⚠️ **Self-signed certificate chỉ dùng cho development!**

- Trình duyệt sẽ cảnh báo "Not Secure"
- Đây là bình thường với certificate tự tạo
- **KHÔNG dùng cho production!**

## Production

Cho production, sử dụng certificate từ:
- Let's Encrypt (miễn phí)
- Certificate Authority (CA) chính thức
- SSL provider

## Xóa certificate

Nếu muốn quay về HTTP:
```bash
del cert.pem key.pem       # Windows
rm cert.pem key.pem        # Linux/Mac
```

## Troubleshooting

### OpenSSL không tìm thấy (Windows)

Download từ: https://slproweb.com/products/Win32OpenSSL.html

### Certificate hết hạn

Certificate tự tạo có hiệu lực 365 ngày. Tạo lại:
```bash
npm run generate-cert
```

### Trình duyệt vẫn cảnh báo

Đây là bình thường! Click:
1. "Advanced" hoặc "Nâng cao"
2. "Proceed to localhost (unsafe)" hoặc "Tiếp tục đến localhost"

---

**Lưu ý:** Files `cert.pem` và `key.pem` đã được thêm vào `.gitignore` nên không được commit lên Git.

