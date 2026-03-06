# TTN OJ Frontend

Frontend cho hệ thống Online Judge TTN OJ, xây dựng bằng React + TypeScript + Vite + Chakra UI.

## Công nghệ chính

- React 18
- TypeScript
- Vite
- Chakra UI
- Axios
- React Router
- ESLint
- Prettier

## Yêu cầu môi trường

- Node.js 20+
- npm 10+
- Backend TTN OJ đang chạy và cho phép CORS từ frontend

## 1. Setup local

Từ thư mục `frontend`:

```bash
npm install
copy .example.env .env
```

Nếu dùng PowerShell:

```powershell
Copy-Item .example.env .env
```

Biến môi trường cần thiết:

```env
VITE_API_URL=http://localhost:5000/api
```

Ghi chú:

- Frontend dev server chạy ở cổng `3000`.
- Mặc định `vite.config.ts` đang proxy `/api` về `http://localhost:5000`.
- Nếu backend deploy ở domain riêng, cập nhật `VITE_API_URL` theo URL backend thực tế.

## 2. Chạy ứng dụng

```bash
npm run dev
```

Sau khi chạy, mở:

- `http://localhost:3000`

## 3. Kiểm tra trước khi push

Các lệnh kiểm tra đã được cấu hình sẵn:

```bash
# Kiểm tra ESLint
npm run lint

# Kiểm tra format
npm run format:check

# Format tự động
npm run format

# Build production
npm run build

# Chạy toàn bộ kiểm tra trước khi push
npm run check
```

`npm run check` sẽ chạy theo thứ tự:

1. `lint`
2. `format:check`
3. `build`

Nếu cả ba bước đều pass thì frontend đã ở trạng thái khá an toàn để push.

## 4. Build production

```bash
npm run build
```

Output build nằm trong thư mục `dist/`.

Có thể kiểm tra bản build local bằng:

```bash
npm run preview
```

## 5. Deploy

Project hiện có 2 hướng deploy chính.

### Cách 1: Deploy lên Vercel

Đây là hướng phù hợp nhất cho frontend Vite tĩnh.

Thiết lập cơ bản:

- Framework: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable bắt buộc: `VITE_API_URL`

Ví dụ:

```env
VITE_API_URL=https://ttn-oj-backend.onrender.com/api
```

Chi tiết từng bước xem thêm trong `DEPLOY.md`.

### Cách 2: Deploy bằng Docker + Nginx

Project đã có sẵn `Dockerfile` và `nginx.conf`.

Build image:

```bash
docker build -t ttn-oj-frontend .
```

Chạy container:

```bash
docker run -p 8080:80 ttn-oj-frontend
```

Khi dùng cách này:

- Nginx sẽ phục vụ file build trong `dist`
- Route SPA được fallback về `index.html`
- `/api` đang được proxy sang service `backend:5000` theo `nginx.conf`

Nếu backend không chạy với hostname `backend`, cần sửa lại cấu hình proxy trong `nginx.conf`.

## 6. Cấu trúc thư mục chính

```text
src/
  components/     # Shared UI components
  controllers/    # Auth/context controllers
  layout/         # Layout components
  modules/        # Feature modules: auth, contest, admin
  pages/          # Top-level pages
  routes/         # Route config
  services/       # API client và service layer
```

## 7. Ghi chú phát triển

- Không gọi API trực tiếp trong UI component.
- Dùng service layer qua `src/services` hoặc `src/modules/*/services`.
- Dùng alias `@` trỏ tới `src`.
- Frontend hiện đang đọc API base URL từ `VITE_API_URL`.
