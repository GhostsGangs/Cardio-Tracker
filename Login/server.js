const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/CardioTracker2", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.error("Error al conectar con MongoDB", err));

// Modelo para Login
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model("Login", UserSchema);

// Rutas
app.post("/register", async(req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).send("Usuario registrado exitosamente");
    } catch (err) {
        res.status(400).send("Error al registrar usuario: " + err.message);
    }
});

app.post("/login", async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.status(200).send("Inicio de sesión exitoso");
        } else {
            res.status(401).send("Credenciales inválidas");
        }
    } catch (err) {
        res.status(500).send("Error en el servidor: " + err.message);
    }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});