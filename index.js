const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3000;

// إعداد Express لقبول JSON في الطلبات
app.use(express.json());

// مسار API لاستقبال الطلبات من العميل
app.post('/connect', async (req, res) => {
    try {
        // تشغيل المتصفح باستخدام Puppeteer مع تعطيل الـ sandbox
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // هذه الخيارات ضرورية لتجنب مشاكل التشغيل في بيئات مثل Replit
        });
        const page = await browser.newPage();

        // البيانات التي تم استقبالها من العميل
        const clientData = req.body;

        // الذهاب إلى الصفحة التي تحتوي على الـ API (استبدل بالرابط الفعلي الخاص بـ InfinityFree)
        await page.goto('http://egypt-radius.rf.gd/', { waitUntil: 'networkidle2' });

        // إرسال طلب POST باستخدام نموذج HTML
        const response = await page.evaluate(async (data) => {
            const response = await fetch('http://egypt-radius.rf.gd/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return response.json();
        }, clientData);

        // إغلاق المتصفح
        await browser.close();

        // إعادة النتيجة للعميل
        res.json({
            message: 'Request successfully processed!',
            infinityFreeResponse: response
        });
    } catch (error) {
        console.error('Error occurred:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
