import React, { useState } from 'react';

const OpenAIChat = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question) return;

    setLoading(true);
    setAnswer('');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // Replace with your actual API key
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'user', content: question }
          ],
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        setAnswer(data.choices[0].message.content.trim());
      } else {
        setAnswer('No response from AI.');
      }
    } catch (error) {
      setAnswer('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Ask OpenAI Anything</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question..."
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />
      <button onClick={askQuestion} style={{ marginTop: '10px', padding: '10px 20px' }}>
        Ask
      </button>
      <div style={{ marginTop: '20px' }}>
        {loading ? <p>Loading...</p> : <p><strong>Answer:</strong> {answer}</p>}
      </div>
    </div>
  );
};

export default OpenAIChat;
