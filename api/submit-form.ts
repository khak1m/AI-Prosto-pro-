export const config = { 
  runtime: 'edge' 
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let body: { 
    name?: string; 
    phone?: string; 
    channels?: string[];
    crm?: string;
  };

  try {
    body = await req.json() as typeof body;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { name, phone, channels, crm } = body;

  if (!name || !phone) {
    return new Response(JSON.stringify({ error: 'Имя и телефон обязательны' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const threadId = process.env.TELEGRAM_THREAD_ID;

  if (!token || !chatId) {
    return new Response(JSON.stringify({ error: 'Сервер не настроен' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
  
  const channelsText = channels && channels.length > 0 
    ? channels.join(', ') 
    : 'не указано';

  const text = [
    '🔔 *Новая заявка с сайта!*',
    '',
    `👤 *Имя:* ${name}`,
    `📞 *Телефон:* ${phone}`,
    `💬 *Каналы:* ${channelsText}`,
    `🔧 *CRM:* ${crm || 'не указано'}`,
    '',
    `⏰ ${now}`,
  ].join('\n');

  const payload: Record<string, unknown> = {
    chat_id: chatId,
    text,
    parse_mode: 'Markdown',
  };

  // Если задан thread_id — отправляем в конкретную тему (лиды)
  if (threadId) {
    payload.message_thread_id = Number(threadId);
  }

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const data = await tgRes.json() as { ok: boolean; description?: string };

    if (!data.ok) {
      console.error('Telegram API error:', data.description);
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Ошибка отправки в Telegram' 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: 'Внутренняя ошибка сервера' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
