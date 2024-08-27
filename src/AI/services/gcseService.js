import axios from 'axios';
import { GCSE_API_KEY, CX } from '../config/config';

export const searchGCSE = async (query) => {
  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: GCSE_API_KEY,
        cx: CX,
        q: query,
      },
    });
    console.log('GCSE API Raw Response:', response.data);
    // return response.data.items;
    if (response.data.items && Array.isArray(response.data.items)) {
        return response.data.items.map(item => ({
          title: item.title,
          snippet: item.snippet,
          link: item.link
        }));
      } else {
        // Handle the case where there are no items
        return [];
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      throw error;
    }
  };
    
//   return formattedResults;

//   } catch (error) {
//     console.error('Error fetching search results:', error);
//     throw error;
//   }
// };
// searchGCSE('Jewish organizations in Brooklyn');

// testGCSE.js
// import axios from 'axios';
// import { GCSE_API_KEY, CX } from '../config/config';

// const searchGCSE = async (query) => {
//   try {
//     const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
//       params: {
//         key: GCSE_API_KEY,
//         cx: CX,
//         q: query,
//       },
//     });
//     console.log('GCSE API Test Results:', response.data.items);
//   } catch (error) {
//     console.error('Error testing GCSE API:', error);
//   }
// };

// searchGCSE('Jewish organizations in Brooklyn');



// const searchResults = [
//     { title: 'Organization A', snippet: 'Details about Organization A' },
//     { title: 'Organization B', snippet: 'Details about Organization B' },
//   ];
  
//   const formattedResponse = searchResults
//     .map(item => `${item.title} - ${item.snippet}`)
//     .join('\n\n');
  
//   console.log('Formatted Response:', formattedResponse);