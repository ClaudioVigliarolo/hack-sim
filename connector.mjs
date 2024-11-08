const API_KEY = 'MY_API_KEY';  

async function chatGPTRequest(prompt) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {  // Use the correct chat completions endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',  // Use your model here, e.g., 'gpt-4' or 'gpt-3.5-turbo'
        messages: [{ role: 'user', content: prompt }],  // Chat models use 'messages' instead of 'prompt'
        max_tokens: 150
      })
    });
    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();  // Use 'message.content' instead of 'text'
    } else {
      throw new Error('No choices found in the response');
    }
  } catch (error) {
    console.error('Error fetching data from OpenAI API:', error);
    return null;
  }
}

chatGPTRequest('YOUR_PROMPT_HERE').then(response => {
  if (response) {
    console.log(response);  // Output the response
  }
});