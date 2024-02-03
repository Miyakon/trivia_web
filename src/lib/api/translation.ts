const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';
const DEEPL_API_KEY = '';

export async function translateJp(words: string) {
    const res = await fetch(`${DEEPL_API_URL}?auth_key=${DEEPL_API_KEY}&text=${words}&source_lang=EN&target_lang=JA`)
    const result = await res.json()

    return result;
}

