# Dokumentasi Sistem Pendukung Keputusan (SPK) Bansos - Metode VIKOR

## 1. Pengantar
Aplikasi ini adalah Sistem Pendukung Keputusan (SPK) untuk menentukan prioritas penerima Bantuan Sosial (Bansos). Sistem ini menggunakan metode **VIKOR** (*VlseKriterijumska Optimizacija I Kompromisno Resenje*), sebuah metode perankingan yang berfokus pada perankingan dan pemilihan dari sekumpulan alternatif untuk mencapai solusi kompromi.

---

## 2. Penjelasan Fitur

### A. Dashboard (`/`)
Halaman utama yang menampilkan ringkasan data sistem:
- **Kriteria Penilaian**: Jumlah kriteria yang digunakan untuk seleksi.
- **Calon Penerima**: Jumlah warga yang terdaftar.
- **Status Sistem**: Indikator kesiapan data untuk dikalkulasi.

### B. Kriteria (`/criteria`)
Di halaman ini, Anda mengatur parameter penilaian.

#### Penjelasan Kolom Input:
1.  **Nama Kriteria**: Label kriteria (contoh: Penghasilan, Tanggungan).
2.  **Bobot (Weight) 0-1**:
    -   Ini adalah **tingkat kepentingan** kriteria tersebut dibanding kriteria lain.
    -   Nilai harus berupa desimal antara `0` sampai `1`.
    -   **Total seluruh bobot idealnya adalah 1 (atau 100%)**.
    -   *Contoh*: Jika Penghasilan sangat penting, beri bobot `0.35`. Jika Pendidikan kurang penting, beri `0.10`.
    -   Semakin besar angkanya, semakin besar pengaruh kriteria tersebut terhadap hasil akhir.
3.  **Tipe (Attribute)**:
    -   **Benefit (Keuntungan)**: Nilai **LEBIH BESAR** semakin **BAGUS/DIPRIORITASKAN**.
        -   *Contoh*: Jumlah Tanggungan (semakin banyak anak, semakin layak dapat bantuan).
    -   **Cost (Biaya)**: Nilai **LEBIH KECIL** semakin **BAGUS/DIPRIORITASKAN**.
        -   *Contoh*: Penghasilan (semakin kecil penghasilan, semakin layak dapat bantuan).

### C. Data Warga / Alternatif (`/alternatives`)
Tempat menginput data calon penerima bantuan.
-   Setiap warga harus dinilai berdasarkan kriteria yang sudah dibuat sebelumnya.
-   Pastikan data diisi dengan angka numerik sesuai skala yang Anda tentukan (misal 1-5, atau nilai asli seperti Rp 1.000.000).

### D. Perhitungan / Kalkulasi (`/calculation`)
Halaman untuk memproses data menggunakan algoritma VIKOR.

#### Output Perhitungan:
1.  **Ranking Utama**: Daftar warga diurutkan dari yang **paling layak** (Rank 1) ke yang kurang layak.
2.  **Nilai Q (VIKOR Index)**:
    -   Nilai Q adalah indeks kompromi.
    -   **Semakin KECIL nilai Q, semakin BAIK rankingnya.**
    -   Ranking 1 adalah warga dengan nilai Q terendah (mendekati 0).
3.  **Nilai S & R**:
    -   **S (Group Utility)**: Mengukur kepuasan mayoritas.
    -   **R (Individual Regret)**: Mengukur penyesalan individu.

---

## 3. Studi Kasus & Contoh Cara Kerja

Misalkan kita ingin mencari penerima bansos dengan kriteria berikut:

| Kriteria | Tipe | Bobot | Penjelasan |
| :--- | :--- | :--- | :--- |
| **C1. Penghasilan** | Cost | 0.50 | Semakin kecil penghasilan, semakin prioritas. |
| **C2. Tanggungan** | Benefit | 0.30 | Semakin banyak anak, semakin prioritas. |
| **C3. Kondisi Rumah** | Cost | 0.20 | Skala 1-10 (1=Sangat Rusak, 10=Mewah). Kita cari yang rusak (Cost). |

**Data Warga:**
1.  **Warga A**: Penghasilan 1 Juta, 3 Anak, Rumah Skala 2 (Rusak).
2.  **Warga B**: Penghasilan 5 Juta, 1 Anak, Rumah Skala 8 (Bagus).

**Analisis Logika:**
-   **Warga A** lebih unggul di C1 (Penghasilan Kecil = Bagus utk Bansos) dan C2 (Anak Banyak = Bagus).
-   **Warga B** kalah prioritas karena kaya dan rumah bagus.

**Hasil VIKOR:**
Sistem akan menghitung jarak nilai masing-masing warga terhadap "Nilai Ideal". Warga A akan memiliki jarak yang lebih dekat ke "Ideal Bansos" (Miskin, Banyak Anak, Rumah Rusak), sehingga Nilai Q-nya akan lebih kecil (mendekati 0) dan menjadi **Ranking 1**.

---

## 4. Tips Penggunaan
1.  **Konsistensi Skala**: Jika menggunakan skala 1-5 untuk kondisi rumah, gunakan rentang yang sama untuk semua warga.
2.  **Total Bobot**: Selalu cek agar total bobot kriteria berjumlah 1.0 agar perhitungan seimbang.
    -   0.5 + 0.3 + 0.2 = 1.0 (Benar)
    -   0.5 + 0.5 + 0.5 = 1.5 (Kurang tepat, meski sistem tetap bisa menghitung)
