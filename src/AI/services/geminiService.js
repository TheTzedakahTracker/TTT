// import axios from 'axios';
import { GEMINI_API_KEY } from '../config/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// // Access the specific model
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// // Function to query the model
// export const queryModel = async (user, text) => {
//   try {
//     const response = await model.generateContent({
//       role: user,
//       parts: text
//     });
//     return response;
//   } catch (error) {
//     console.error('Error querying model:', error);
//     return { response: 'An error occurred' };
//   }
// };


// import { GEMINI_API_KEY } from '../config/config';

// const API_KEY = GEMINI_API_KEY;

export const queryModel = async (text) => {
//   try {
//     const response = await axios.post(
//       'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
//       {
//         contents: [
//           {
//             role: 'user',
//             parts: [{ text }]
//           }
//         ]
//       },          
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'x-goog-api-key': API_KEY
//         }
//       }
//     )
// ;

//     return response.data;
//   } catch (error) {
//     console.error('Error querying Gemini API:', error);
//     return { response: 'An error occurred' };
//   }
// };



async function run() {
  const prompt = 'but if i ask you questions about tax do you know anytihing about a laymen being able to benefit from it with their normal jobs'

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  // console.log(text);
}

run();
};