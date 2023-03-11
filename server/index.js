require('dotenv').config(); // С помощью данной строчки обеспечивается доступ к env файлу
const express = require('express'); // require - это втроенная функция для включения модулей, аналог импорта
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

// Обработка ошибок, последний Middleware
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate(); // С помощью неё устанавливается подключение к БД
        await sequelize.sync(); // Сверяет состояние БД со схемой данных
        app.listen(PORT, console.log(`Server started on PORT ${PORT}`)) // Функция которая отрабатывает при успешном запуске сервера
    }
    catch (e) {
        console.log(e);
    }
}


start();
