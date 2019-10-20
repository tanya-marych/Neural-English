const ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';
import { REACT_APP_GOOGLE_TRANSLATE_API_KEY } from 'react-native-dotenv';

const TRANSLATE_URL = ENDPOINT + `?key=${REACT_APP_GOOGLE_TRANSLATE_API_KEY}`;

export const translate = async () => {

console.warn('apiKey', REACT_APP_GOOGLE_TRANSLATE_API_KEY);
  try {
    const response = await fetch(TRANSLATE_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: 'Hello, world',
        source: 'en',
        target: 'es',
        format: 'text',
      }),
    });
    let responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.warn(error);
  }
}