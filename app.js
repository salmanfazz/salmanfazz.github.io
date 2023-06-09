// Mendapatkan elemen-elemen yang diperlukan
const compressForm = document.getElementById("compress-form");
const audioFileInput = document.getElementById("audio-file");
const fileNameSpan = document.getElementById("file-name");
const originalSizeSpan = document.getElementById("original-size");
const outputSizeSpan = document.getElementById("output-size");
const sizeCompressedSpan = document.getElementById("size-compressed");
const downloadBtn = document.getElementById("download-btn");

// Mendengarkan acara pengiriman formulir kompresi
compressForm.addEventListener("submit", compressAudio);

// Fungsi untuk mengkompresi audio
function compressAudio(event) {
  event.preventDefault();

  // Mendapatkan file audio yang diunggah
  const audioFile = audioFileInput.files[0];

  // Validasi jika file audio tidak ada
  if (!audioFile) {
    alert("Mohon unggah file audio!");
    return;
  }

  // Membaca file audio dengan bantuan FileReader
  const reader = new FileReader();
  reader.onload = function (e) {
    const audioData = e.target.result;

    // Lakukan proses kompresi audio sesuai kebutuhan

    // Simulasi proses kompresi audio (di sini, kita hanya mengubah ukuran file secara acak)
    const originalSize = audioFile.size;
    const compressedSize = Math.floor(originalSize * 0.5); // Misalnya, ukuran dikompresi adalah setengah ukuran asli

    // Menampilkan hasil kompresi pada halaman
    fileNameSpan.textContent = audioFile.name;
    originalSizeSpan.textContent = formatFileSize(originalSize);
    outputSizeSpan.textContent = formatFileSize(originalSize - compressedSize);
    sizeCompressedSpan.textContent = formatFileSize(compressedSize);

    // Mengaktifkan tombol unduh
    downloadBtn.disabled = false;
  };

  // Membaca file audio sebagai data URL
  reader.readAsDataURL(audioFile);
}

// Fungsi untuk mengubah ukuran file menjadi format yang lebih mudah dibaca
function formatFileSize(size) {
  if (size < 1024) {
    return size + " bytes";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + " KB";
  } else {
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  }
}
// Mendengarkan acara klik pada tombol unduh
downloadBtn.addEventListener("click", downloadCompressedAudio);

// Fungsi untuk mengunduh file audio yang telah dikompresi
function downloadCompressedAudio(event) {
  // Mendapatkan URL audio yang dikompresi
  const compressedAudioURL = URL.createObjectURL(audioFileInput.files[0]);

  // Mendapatkan nama file audio yang dikompresi
  const compressedFileName = fileNameSpan.textContent;

  // Membuat elemen <a> untuk mengunduh file
  const downloadLink = document.createElement("a");
  downloadLink.href = compressedAudioURL;
  downloadLink.download = compressedFileName;

  // Memicu klik pada elemen <a> untuk memulai unduhan
  downloadLink.click();

  // Membersihkan URL objek setelah unduhan selesai
  URL.revokeObjectURL(compressedAudioURL);
}

// Mendengarkan acara pengiriman formulir kompresi
compressForm.addEventListener("submit", compressAudio);
