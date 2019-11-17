import { REACT_APP_GOOGLE_TRANSLATE_API_KEY } from 'react-native-dotenv';

const TRANSLATE_URL = `https://translation.googleapis.com/language/translate/v2?key=${REACT_APP_GOOGLE_TRANSLATE_API_KEY}`;

export const translate = async ({ text, toLang }) => {
  try {
    const response = await fetch(TRANSLATE_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: toLang,
        format: 'text',
      }),
    });
    const responseJson = await response.json();
    const translation = responseJson.data.translations[0].translatedText;

    return translation;
  } catch (error) {
    console.warn(error);
  }
}