import express from "express";

const router = express.Router();

router.get("/reverse", async (req, res) => {
  const { lat, lon } = req.query;

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
    {
      headers: {
        "User-Agent": "PoltergeistApp/1.0 (contact@poltergeist.com)"
      }
    }
  );

  const data = await response.json();
  res.json(data);
});

export default router;
