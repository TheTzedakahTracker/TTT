import { GEMINI_API_KEY } from '../config/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);


const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


export const queryModel = async (text) => {


try {

  console.log('User Input:', text);

  const result = await model.generateContent(text)

  const responseText = await result.response.text();

  console.log('Gemini API Response:', responseText);
  
  const requiresSearch = text.includes('');
  const searchQuery = requiresSearch ? text : '';
  
  console.log('Determined requiresSearch:', requiresSearch);
  console.log('Search Query:', searchQuery);

  return { text: responseText, requiresSearch, searchQuery };
} catch (error) {
  console.error('Error querying model:', error);

  return { text: 'An error occurred', requiresSearch: false };
}

}



// import { GEMINI_API_KEY } from '../config/config';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// const testGemini = async () => {
//   try {
//     const result = await model.generateContent("Tell me about Jewish organizations.");
//     const responseText = await result.response.text();
//     console.log('Gemini API Test Response:', responseText);
//   } catch (error) {
//     console.error('Error testing Gemini API:', error);
//   }
// };

// testGemini();