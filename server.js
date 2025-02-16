const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 5001; 

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

let wastes = [];

app.post('/waste', upload.single('image'), (req, res) => {
  const { title, titleAr, description, descriptionAr, type, quantity, location, companyName, companyNameAr, contactPerson, email, phone } = req.body;
  const image = req.file;

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
    image: image ? `http://localhost:${port}/uploads/${image.filename}` : null,
    createdAt: new Date().toISOString()
  };

  wastes.push(newWaste);
  res.status(201).json(newWaste);
});

app.get('/waste', (req, res) => {
  res.status(200).json(wastes);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
