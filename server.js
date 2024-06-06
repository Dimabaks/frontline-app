const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Включите CORS
app.use(cors());

// Middleware для обработки JSON-тел запросов
app.use(bodyParser.json());

// Настройка транспортера для отправки email через Mail.ru
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true, // true для портов 465, false для других портов
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Служба статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Обработка GET-запроса на корневой URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Обработка POST-запросов на /api/booking
app.post('/api/booking', (req, res) => {
  const { name, phone, data, quantity, zone } = req.body;
  console.log('Полученные данные формы:', { name, phone, data, quantity, zone });

  const mailOptions = {
    from: process.env.EMAIL,
    to: 'dvb.virtual@mail.ru',
    subject: 'Новая бронь',
    text: `Имя: ${name}\nНомер телефона: ${phone}\nДата и время брони: ${data}\nКоличество человек: ${quantity}\nЗона: ${zone}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Ошибка при отправке письма:', error);
      res.status(500).send('Ошибка при отправке формы');
    } else {
      console.log('Письмо отправлено:', info.response);
      res.status(200).send('Форма успешно отправлена');
    }
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
