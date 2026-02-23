const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

const fallback = {
    medicine_name: 'Unknown medicine',
    generic_name: 'Unknown',
    type: 'Unknown',
    uses: 'Unable to identify from image.',
    dosage: 'Consult a qualified doctor or pharmacist before using.',
    side_effects: 'Unknown',
    warnings: 'Image recognition may be incorrect. Confirm medicine name before use.',
    interactions: 'Unknown',
    manufacturer: 'Unknown',
    storage: 'Follow storage instructions on the label.',
    prescription_required: true,
    malayalam_translation: {
        medicine_name: 'തിരിച്ചറിയാനാകാത്ത മരുന്ന്',
        generic_name: 'അറിയില്ല',
        type: 'അറിയില്ല',
        uses: 'ചിത്രത്തിൽ നിന്ന് തിരിച്ചറിയാനായില്ല.',
        dosage: 'ഉപയോഗിക്കുന്നതിന് മുമ്പ് ഡോക്ടറെയോ ഫാർമസിസ്റ്റിനെയോ സമീപിക്കുക.',
        side_effects: 'അറിയില്ല',
        warnings: 'ചിത്ര തിരിച്ചറിയൽ തെറ്റായിരിക്കാം. പേര് സ്ഥിരീകരിച്ച് മാത്രം ഉപയോഗിക്കുക.',
        interactions: 'അറിയില്ല',
        manufacturer: 'അറിയില്ല',
        storage: 'ലേബലിലെ നിർദ്ദേശം പോലെ സൂക്ഷിക്കുക.',
        prescription_required: true
    }
};

function quotaFallback() {
    return {
        ...fallback,
        warnings: 'It looks like we need a short break before processing more requests. Please try again in a little while.',
        malayalam_translation: {
            ...fallback.malayalam_translation,
            warnings: 'കുറച്ച് സമയം ഇടവേള ആവശ്യമാണ് 🙂 ദയവായി കുറച്ച് കഴിഞ്ഞ് വീണ്ടും ശ്രമിക്കുക.'
        }
    };
}

function parseJsonFromText(text) {
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        if (start === -1 || end === -1 || end <= start) return null;
        try {
            return JSON.parse(text.slice(start, end + 1));
        } catch {
            return null;
        }
    }
}

function shapeResponse(data) {
    return {
        medicine_name: data?.medicine_name || fallback.medicine_name,
        generic_name: data?.generic_name || fallback.generic_name,
        type: data?.type || fallback.type,
        uses: data?.uses || fallback.uses,
        dosage: data?.dosage || fallback.dosage,
        side_effects: data?.side_effects || fallback.side_effects,
        warnings: data?.warnings || fallback.warnings,
        interactions: data?.interactions || fallback.interactions,
        manufacturer: data?.manufacturer || fallback.manufacturer,
        storage: data?.storage || fallback.storage,
        prescription_required: Boolean(data?.prescription_required),
        malayalam_translation: {
            medicine_name: data?.malayalam_translation?.medicine_name || fallback.malayalam_translation.medicine_name,
            generic_name: data?.malayalam_translation?.generic_name || fallback.malayalam_translation.generic_name,
            type: data?.malayalam_translation?.type || fallback.malayalam_translation.type,
            uses: data?.malayalam_translation?.uses || fallback.malayalam_translation.uses,
            dosage: data?.malayalam_translation?.dosage || fallback.malayalam_translation.dosage,
            side_effects: data?.malayalam_translation?.side_effects || fallback.malayalam_translation.side_effects,
            warnings: data?.malayalam_translation?.warnings || fallback.malayalam_translation.warnings,
            interactions: data?.malayalam_translation?.interactions || fallback.malayalam_translation.interactions,
            manufacturer: data?.malayalam_translation?.manufacturer || fallback.malayalam_translation.manufacturer,
            storage: data?.malayalam_translation?.storage || fallback.malayalam_translation.storage,
            prescription_required: Boolean(data?.malayalam_translation?.prescription_required)
        }
    };
}

exports.analyzeImage = async (imageBuffer, mimeType = 'image/jpeg') => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) throw new Error('GEMINI_API_KEY is missing');
    if (apiKey.includes('your_gemini_api_key_here')) {
        throw new Error('GEMINI_API_KEY is still a placeholder value in .env');
    }

    const base64Image = imageBuffer.toString('base64');
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(DEFAULT_MODEL)}:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: `Analyze this medicine image and return ONLY JSON with this exact shape:
{
  "medicine_name": string,
  "generic_name": string,
  "type": string,
  "uses": string,
  "dosage": string,
  "side_effects": string,
  "warnings": string,
  "interactions": string,
  "manufacturer": string,
  "storage": string,
  "prescription_required": boolean,
  "malayalam_translation": {
    "medicine_name": string,
    "generic_name": string,
    "type": string,
    "uses": string,
    "dosage": string,
    "side_effects": string,
    "warnings": string,
    "interactions": string,
    "manufacturer": string,
    "storage": string,
    "prescription_required": boolean
  }
}
Rules:
- Malayalam text must be natural Malayalam script.
- Keep content concise and safe for users.
- If unknown, use "Unknown" and "അറിയില്ല".`
                        },
                        {
                            inlineData: {
                                mimeType,
                                data: base64Image
                            }
                        }
                    ]
                }
            ],
            generationConfig: { temperature: 0.2 }
        })
    });

    if (response.status === 429) return quotaFallback();
    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Gemini request failed: ${response.status} ${errText}`);
    }

    const payload = await response.json();
    const text = payload?.candidates?.[0]?.content?.parts?.map((part) => part?.text || '').join('\n') || '';
    const parsed = parseJsonFromText(text);
    return parsed ? shapeResponse(parsed) : fallback;
};
