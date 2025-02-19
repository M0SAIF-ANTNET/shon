const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 5001;


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

const upload = multer({ storage, fileFilter });


let wastes = [];


app.post("/waste", upload.single("image"), (req, res) => {
  try {
    const { title, titleAr, description, descriptionAr, type, quantity, location, companyName, companyNameAr, contactPerson, email, phone } = req.body;
    if (!title || !type || !quantity || !location || !contactPerson || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newWaste = {
      id: wastes.length + 1,
      title,
      titleAr,
      description,
      descriptionAr,
      type,
      quantity,
      location,
      companyName,
      companyNameAr,
      contactPerson,
      email,
      phone,
      image: req.file ? `http://localhost:${port}/uploads/${req.file.filename}` : null,
      createdAt: new Date().toISOString()
    };

    wastes.push(newWaste);
    res.status(201).json(newWaste);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/waste", (req, res) => res.status(200).json(wastes));


app.use("/uploads", express.static(uploadDir));


app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
