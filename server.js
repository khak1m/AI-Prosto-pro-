import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Настройки Telegram
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID_HERE';

app.use(cors());
app.use(express.json());

// Функция отправки в Telegram
async function sendToTelegram(formData) {
    const message = `
🔔 Новая заявка с сайта!

👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
💬 Каналы: ${formData.channels.join(', ') || 'Не указано'}
🔧 CRM: ${formData.crm || 'Не указано'}

⏰ Время: ${new Date().toLocaleString('ru-RU')}
    `.trim();

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        })
    });

    return response.json();
}

// Endpoint для приема заявок
app.post('/api/submit-form', async (req, res) => {
    try {
        const formData = req.body;
        
        // Отправляем в Telegram
        const result = await sendToTelegram(formData);
        
        if (result.ok) {
            res.json({ success: true, message: 'Заявка отправлена!' });
        } else {
            throw new Error(result.description || 'Ошибка отправки');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Ошибка отправки заявки' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
