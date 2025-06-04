// Actual OpenAI service to generate design concepts
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

/**
 * Generates a design concept using OpenAI's Chat Completion API
 * @param {string} description - User's design idea description
 * @returns {Promise<Object>} - Generated design concept
 */
export const generateDesignConcept = async (description) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an AI assistant that creates short product design concepts. Respond in JSON with fields name, description and brief.',
        },
        { role: 'user', content: description },
      ],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  let content = data.choices?.[0]?.message?.content?.trim() || '';

  try {
    const parsed = JSON.parse(content);
    return { ...parsed, imageUrl: null };
  } catch (err) {
    // Fallback if response is not valid JSON
    return {
      name: 'Design Concept',
      description: content,
      brief: '',
      imageUrl: null,
    };
  }
};