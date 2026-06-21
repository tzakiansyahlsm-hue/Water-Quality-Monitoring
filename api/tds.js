// Menyimpan data terbaru di memori RAM server secara real-time
let currentWaterData = {
  voltage: 0,
  tds: 0,
  status: "No Data",
  timestamp: new Date().toISOString()
};

export default function handler(req, res) {
  // Mengaktifkan fitur izin akses lintas sistem (CORS) agar ESP32 tidak terblokir
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. PROSES JIKA ESP32 MENGIRIM DATA BARU (POST)
  if (req.method === 'POST') {
    let body = req.body;

    // Mengubah paksa string dari ESP32 menjadi objek data JSON
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.error("Gagal membaca struktur teks dari ESP32:", e);
      }
    }

    const { voltage, tds, status } = body || {};
    
    // Menyimpan data kiriman terbaru ke memori aktif server
    currentWaterData = {
      voltage: parseFloat(voltage) || 0,
      tds: parseFloat(tds) || 0,
      status: status || "Unknown",
      timestamp: new Date().toISOString()
    };

    console.log("Data Berhasil Masuk:", currentWaterData);
    return res.status(200).json(currentWaterData);
  } 
  
  // 2. PROSES JIKA WEB DASHBOARD MEMINTA DATA UNTUK GRAFIK (GET)
  else if (req.method === 'GET') {
    return res.status(200).json(currentWaterData);
  } 
  
  else {
    return res.status(405).json({ message: "Metode pengiriman tidak didukung" });
  }
}
