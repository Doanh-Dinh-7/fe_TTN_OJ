# Hướng dẫn deploy TTN OJ Frontend (repo riêng)

Repo này chỉ chứa frontend; backend và frontend là **hai repo Git riêng**. Deploy lên **Vercel**.

---

## Vercel

1. Đăng nhập [Vercel](https://vercel.com) → **Add New** → **Project**
2. Import **repo frontend** (repo Git chứa code này), nhánh chính
3. **Root Directory:** để trống (repo root = app)
4. **Framework Preset:** Vite (tự nhận hoặc chọn Vite)
5. **Build Command:** `npm run build` (mặc định)
6. **Output Directory:** `dist` (mặc định Vite)
7. **Environment variables** (thêm trong Project Settings → Environment Variables):
   - `VITE_API_URL` = URL Backend (Render), ví dụ: `https://ttn-oj-backend.onrender.com`  
     (không slash cuối; dùng cho mọi môi trường Production/Preview nếu cần)
8. **Deploy** → sau khi xong, copy URL Vercel (vd: `https://ttn-oj.vercel.app`)

---

## Cập nhật Backend (CORS)

Sau khi có URL Vercel, vào **Render** → Web Service Backend → **Environment** → thêm/cập nhật:

- `CORS_ORIGINS` = `https://ttn-oj.vercel.app` (và các domain preview nếu cần, cách nhau bằng dấu phẩy)
- `FRONTEND_URL` = `https://ttn-oj.vercel.app`

Rồi **Save** và redeploy Backend nếu cần.

---

## Biến build (local / CI)

Build cần `VITE_API_URL` lúc build time. Có thể dùng file `.env` (không commit) hoặc `.example.env` làm mẫu:

```
VITE_API_URL=https://ttn-oj-backend.onrender.com
```

Vercel sẽ dùng giá trị đã set trong Dashboard, không cần file `.env` trên repo.
