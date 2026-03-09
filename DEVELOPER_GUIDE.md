# 🌿 ECOTECH Developer Guide

Selamat datang di tim pengembang ECOTECH! Panduan ini akan membantu Anda menyiapkan lingkungan pengembangan dengan cepat dan efisien.

## 🚀 Persyaratan Sistem
Pastikan Anda sudah menginstal:
- **Node.js** (rekomendasi versi LTS)
- **Git**

## 🛠️ Langkah Awal (Setup)

### 1. Clone Repositori
```bash
git clone https://github.com/snixthinn/ECOTECH.git
cd ECOTECH
```

### 2. Environment Variables (.env)
Aplikasi ini sudah dikonfigurasi dengan nilai default untuk `localhost`. Namun, jika Anda perlu mengubah alamat API, silakan buat file `.env` di folder `frontend`:

- Masuk ke folder `frontend`
- Copy file `.env.example` menjadi `.env`
- Sesuaikan `VITE_API_URL` jika diperlukan.

---

## 💻 Menjalankan Aplikasi

### 🔥 Frontend (Vite)
```bash
cd frontend
npm install
npm run dev
```
Akses di: [http://localhost:5173](http://localhost:5173)

### ⚙️ Backend (Express)
```bash
cd backend
npm install
npm start
```
Berjalan di: [http://localhost:3001](http://localhost:3001)

### 🐍 Camera AI (Python)
Untuk menjalankan modul AI:
```bash
cd camera_ai
# (Opsional: Setup virtual environment)
# python -m venv venv
# source venv/bin/scripts/activate (Windows: venv\Scripts\activate)
python main.py
```

---

## 🤝 Aturan Berkolaborasi
- **Jangan mengunggah file `.env`**: File ini sudah masuk dalam `.gitignore` agar data sensitif aman.
- **Gunakan Template**: Jika ada variabel lingkungan baru, tambahkan ke file `.env.example`.
- **Branching**: Selalu buat branch baru untuk fitur baru (`git checkout -b fitur-saya`).

Selamat coding! 🚀
