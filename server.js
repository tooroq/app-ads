const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const folderPath = __dirname; // المجلد الحالي

// توفير الملفات الثابتة
app.use(express.static(folderPath));

// مسار لعرض محتويات المجلد
app.get('/list', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).send('حدث خطأ أثناء قراءة المجلد.');
        }

        const fileList = files.map(file => {
            const isDirectory = fs.statSync(path.join(folderPath, file)).isDirectory();
            return { name: file, isDirectory };
        });

        res.json(fileList);
    });
});

// تشغيل الخادم
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
