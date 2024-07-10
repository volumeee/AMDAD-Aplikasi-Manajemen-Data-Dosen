# SAMDAD - Aplikasi Manajemen Data Dosen

**SAMDAD** adalah aplikasi manajemen data dosen yang dirancang untuk mengelola informasi terkait dosen, mata kuliah yang diajarkan, dan detail terkait lainnya. Aplikasi ini dibangun menggunakan React dan Supabase untuk otentikasi dan database real-time.

## Fitur
- **Halaman utama** yang menampilkan daftar dosen dan mata kuliah.
- **Sistem otentikasi** menggunakan Supabase.
- **CRUD (Create, Read, Update, Delete)** untuk data dosen dan mata kuliah.
- **Integrasi dengan database real-time Supabase** untuk menyimpan dan mengelola data dosen dan mata kuliah.

## Instalasi
Ikuti langkah-langkah di bawah ini untuk menginstal dan menjalankan aplikasi di lingkungan lokal Anda.

### Prasyarat
- Node.js
- npm atau yarn

### Schema Visualizer
![Screenshot 2024-07-10 203124](https://github.com/volumeee/AMDAD-Aplikasi-Manajemen-Data-Dosen/assets/57589007/8b9ea10f-1c33-4918-8fcf-38a709757266)


### Langkah-langkah
1. **Clone repository ini:**

   ```bash
   git clone https://github.com/volumeee/SAMDAD-App.git
   cd SAMDAD-App
   ```
2. **Instal dependensi:**
   ```bash
   npm install
   ```
4. **Konfigurasi Supabase:**
   ```bash
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-key
   ```
6. **Jalankan aplikasi:**
   ```bash
   npx expo start
   ```

## Penggunaan
### Halaman Utama
Halaman utama menampilkan daftar dosen yang tersedia. Pengguna dapat melihat detail dosen dan mata kuliah, serta melakukan operasi CRUD.

### Sistem CRUD
-  Tambah Dosen/Mata Kuliah: Pengguna dapat menambahkan data dosen atau mata kuliah baru melalui form input.
-  Update Dosen/Mata Kuliah: Pengguna dapat mengedit data dosen atau mata kuliah yang sudah ada.
-  Delete Dosen/Mata Kuliah: Pengguna dapat menghapus data dosen atau mata kuliah yang tidak lagi diperlukan.

### Otentikasi Admin 
Pengguna dapat mendaftar dan masuk menggunakan email dan kata sandi mereka. Otentikasi dilakukan menggunakan Supabase.

### Struktur Proyek 
```bash
.
├── src
│   ├── components
│   │   ├── cruddosen
│   │   │   ├── InputDosenModal.tsx
│   │   │   ├── TableHeaderDDosen.tsx
│   │   │   ├── TableRowDDosen.tsx
│   │   │   ├── UpdateDeleteDosenModal.tsx
│   │   ├── crudmatkul
│   │   │   ├── AddMataKuliahModal.tsx
│   │   │   ├── TableHeaderDMataKuliah.tsx
│   │   │   ├── TableRowDMataKuliah.tsx
│   │   │   ├── UpdateDeleteMataKuliahModal.tsx
│   │   ├── login
│   │   │   ├── Auth.tsx
│   │   ├── profile
│   │   │   ├── Avatar.tsx
│   │   │   ├── AvatarSection.tsx
│   │   │   ├── ProfileModal.tsx
│   ├── hooks
│   │   ├── SupabaseHooks.ts
│   │   ├── useAuth.ts
│   ├── screen
│   │   ├── DDosenScreen.tsx
│   │   ├── DMataKuliahScreen.tsx
│   ├── services
│   │   ├── supabase.ts
│   ├── types
│   │   ├── env.d.ts
│   │   ├── types.ts
├── .env
└── etc..

```
