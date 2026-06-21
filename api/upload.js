import fs from "fs";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  try {

    const data = {
      voltage: req.body.voltage,
      tds: req.body.tds,
      status: req.body.status,
      timestamp: new Date().toISOString()
    };

    fs.writeFileSync(
      "./data.json",
      JSON.stringify(data, null, 2)
    );

    return res.status(200).json({
      success: true
    });

  } catch(err) {

    return res.status(500).json({
      error: err.message
    });

  }

}