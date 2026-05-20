// api/chat.mjs
export default async function handler(req, res) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持 POST 请求' });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: '未配置 API Key，请联系管理员' });
  }

  const apiUrl = 'https://api.deepseek.com/v1/chat/completions';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(req.body)
    });

    // 将 DeepSeek 的响应原样返回给前端
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('AI 请求失败:', error);
    res.status(500).json({ error: '牌灵暂时无法回应，请稍后再试' });
  }
}