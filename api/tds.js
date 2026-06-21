import fs from "fs";

export default function handler(req, res) {

  try {

    const raw =
      fs.readFileSync("./data.json");

    const data =
      JSON.parse(raw);

    return res.status(200).json(data);

  } catch(err) {

    return res.status(200).json({
      voltage: 0,
      tds: 0,
      status: "No Data",
      timestamp: ""
    });

  }

}