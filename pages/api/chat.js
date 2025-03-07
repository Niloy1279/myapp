export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { message } = req.body;
    const API_KEY = process.env.ECHOGPT_API_KEY;
  
    if (!API_KEY) {
      return res.status(500).json({ message: 'API key not found' });
    }
  
    try {
      const response = await fetch('https://api.echogpt.live/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
          model: 'EchoGPT',
        }),
      });
  
      const data = await response.json();
      res.status(200).json({ role: 'assistant', content: data.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ message: 'Error communicating with EchoGPT' });
    }
  }
  