import express from 'express';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Crear carpeta si no existe
const uploadDir = path.join(__dirname, 'candidatos_archivos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configurar multer para guardar en disco local
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Añade la fecha para evitar que se sobreescriban archivos con el mismo nombre
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/api/apply', upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), async (req, res) => {
  try {
    const { fullName, email, area, schedule, salary, address, message } = req.body;

    // Archivos adjuntos
    const cvFile = req.files && req.files['cv'] ? req.files['cv'][0] : null;
    const photoFile = req.files && req.files['photo'] ? req.files['photo'][0] : null;

    // 1. Configurar Hostinger SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false,
      auth: {
        user: 'test@multiserviciosdch.com', // El correo que ENVIARÁ los correos
        pass: 'Dunk3r$7142' // *ATENCIÓN*: Reemplaza esto con la contraseña real del correo test@multiservicios.com
      }
    });

    // 2. Preparar los archivos para adjuntarlos al correo
    const attachments = [];
    if (cvFile) {
      attachments.push({
        filename: cvFile.originalname,
        path: cvFile.path
      });
    }
    if (photoFile) {
      attachments.push({
        filename: photoFile.originalname,
        path: photoFile.path
      });
    }

    // 3. Crear el correo
    const mailOptions = {
      from: '"Reclutamiento DCH" <test@multiserviciosdch.com>', // Quien envía (debe ser el mismo de la autenticación)
      to: 'rrhh@multiserviciosdch.com',                         // A donde llegará el correo
      subject: `Nueva Aplicación - ${fullName} - ${area}`,
      html: `
        <h2>Nueva Aplicación de Trabajo Recibida</h2>
        <p><strong>Nombre completo:</strong> ${fullName}</p>
        <p><strong>Correo electrónico:</strong> ${email}</p>
        <p><strong>Área de trabajo:</strong> ${area}</p>
        <p><strong>Disposición de horario:</strong> ${schedule}</p>
        <p><strong>Pretensión salarial:</strong> ${salary}</p>
        <p><strong>Dirección:</strong> ${address || 'No proporcionada'}</p>
        <br/>
        <p><strong>Mensaje o presentación:</strong></p>
        <p>${message || 'Sin mensaje'}</p>
        <br/>
        <p><em>Los archivos adjuntos (CV y Foto) se encuentran en este correo.</em></p>
      `,
      attachments: attachments
    };

    // 4. Enviar el correo
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Aplicación enviada correctamente' });

  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ success: false, error: 'Ocurrió un error al enviar la aplicación' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend de Correos corriendo en el puerto ${PORT}`);
});
