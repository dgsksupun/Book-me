const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const Place = require("./models/Places");
const Booking = require("./models/Booking");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "45%&%^&^*^*GJGHMKB";

//5guvRtu3PS6X5VFL

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

function getUserDataFromRequest(req){
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userDoc) => {
      if(err) throw err;
      resolve(userDoc);
    });
  });
  
}

app.get("/test", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json("test ok");
});


app.post("/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userDoc.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkInTime,
    checkOutTime,
    maxGuests,
    pricePerNight,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userDoc.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkInTime,
      checkOutTime,
      maxGuests,
      pricePerNight,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
    const { id } = userDoc;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkInTime,
    checkOutTime,
    maxGuests,
    pricePerNight,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userDoc.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkInTime,
        checkOutTime,
        maxGuests,
        pricePerNight ,
      });
      await placeDoc.save();
      res.json('ok');
    }
  }); 
});

app.get('/places', async (req, res) => {
  res.json(await Place.find());
});

app.post('/bookings', async (req, res) => {
  try {
    const userDoc = await getUserDataFromRequest(req);

    const {
      place, checkIn, checkOut, guests, name, phoneNumber, price,
    } = req.body;

    // Check if the user has already booked the same place within the given date range
    const existingBooking = await Booking.findOne({
      user: userDoc.id,
      place,
      $or: [
        { checkIn: { $lte: checkIn }, checkOut: { $gte: checkIn } },
        { checkIn: { $lte: checkOut }, checkOut: { $gte: checkOut } },
      ],
    });

    if (existingBooking) {
      // User has already booked the same place within the given date range
      return res.status(400).json({ error: 'You have already booked this place for the selected dates.' });
    }

    // If no existing booking is found, create a new booking
    const newBooking = await Booking.create({
      place,
      checkIn,
      checkOut,
      guests,
      name,
      phoneNumber,
      price,
      user: userDoc.id,
    });

    res.json(newBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.get('/bookings', async (req, res) => {
const userDoc =  await getUserDataFromRequest(req);
res.json( await Booking.find({user:userDoc.id}).populate('place'));
});


app.listen(4000);
//
