// const express = require('express');
// const cors = require('cors')
// const app = express();
// const port = 3001;

// app.use(express.json());

// app.use(cors({ origin: '*' }));

// const userData = {
//     _id: "1234",
//     userName: "manoj",
//     fullName: "manoj kumar",
//     history: [{ name: "crash", gameId: "1234", Time: "1230140125", put: 100, take: 50 }, { name: "roulette", gameId: "5678", time: "1240140125", put: 100, take: 50 }, { name: "dice", gameId: "9012", time: "1250140125", put: 100, take: 50 }],
//     walletAmount: 1000,
//     isLoggedIn: true
// }

// app.get('/', (req, res) => {
//   res.send('hello world')
// })

// app.post('/loginAuth', (req, res) => {
//     if (req.body.userName === "root" && req.body.password === "root") {
//         return res.status(200).json(userData)
//     } else {
//         return res.status(401).json({ message: "Invalid username or password" });
//     }

// })


// app.use((req, res) => {
//     res.status(404).send({ message: "Route not found" }); // Handle undefined routes
// });

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });





const express = require("express");
const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");
// const dbConnect = require("./connection");
// const { User } = require("./dbSchema");

const app = express();

dbConnect(); // connecting to database

// Middleware
app.use(express.json());

app.use(cors({ origin: '*' }));



app.get('/', (req, res) => {
  res.send('hello world')
})


// Routes
// app.get("/admin", async (req, res) => {
//     try {
//         const adminDetails = await Admin.find().lean();
//         console.log(adminDetails);
//         res.status(200).send(adminDetails);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error fetching admin details" });
//     }
// });
// const upload = multer({ dest: "uploads/" }); // Temporary upload folder

// app.post("/updateProfile/:password", upload.single("image"), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "Nofile Uploaded" })
//         }
//         if (req.params.password !== "Password") {
//             return res.status(400).json({ message: "unauthorized upload" })
//         }
//         const ProfileData = fs.readFileSync(req.file.path);

//         const updatedProfile = await Admin.findOneAndUpdate(
//             { "Profile.FullName": "Manoj Kumar Biradar" },
//             {
//                 $set: {
//                     "Profile.ProfileImage": {
//                         data: ProfileData,
//                         contentType: req.file.mimetype,
//                     },
//                 },
//             },
//             { new: true }
//         );
//         if (!updatedProfile) {
//             fs.unlinkSync(req.file.path); // Cleanup uploaded file
//             return res.status(404).json({ message: "Profile not found" });
//         }

//         // Clean up the uploaded file
//         fs.unlinkSync(req.file.path)

//         res.status(200).json({ message: "Profile updated successfully!" });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating Profile", error: error.message });
//     }

// });

// app.post("/updateicon/:name", upload.single("image"), async (req, res) => {
//     try {
//         // Ensure file is uploaded
//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }
//         // Read the uploaded image
//         const imgData = fs.readFileSync(req.file.path);

//         // Update the specific skill's icon in the MongoDB document
//         const updatedAdmin = await Admin.findOneAndUpdate(
//             { "Skills.name": req.params.name },  // Only use the skillId to find the skill
//             {
//                 $set: {
//                     "Skills.$.icon": {
//                         data: imgData,
//                         contentType: req.file.mimetype,
//                     },
//                 },
//             },
//             { new: true } // Return the updated document
//         );

//         // If no skill is found, return an error
//         if (!updatedAdmin) {
//             fs.unlinkSync(req.file.path); // Cleanup uploaded file
//             return res.status(404).json({ message: "Skill not found" });
//         }

//         // Clean up the uploaded file
//         fs.unlinkSync(req.file.path)

//         res.status(200).json({ message: "Skill icon updated successfully!" });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating skill icon", error: error.message });
//     }
// });



// app.post("/submit", async (req, res) => {
//   try {

//     const newUser = new User(req.body);

//     const response = await newUser.save();

//     res.status(200).json({ message: "Details saved", user: response });

//   } catch (err) {

//     res.status(500).json({ message: "Error saving details", error: err.message });
//   }
// });

// Server Setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
