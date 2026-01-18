// OpenRouter AI Service
// Text: Gemini 3 Flash
// Images: Nano Banana Pro

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1'

// Get API key from environment
const getApiKey = () => import.meta.env.VITE_OPENROUTER_API_KEY || ''

// Generate property description using Gemini 3 Flash
export const generatePropertyDescription = async (project, language = 'ru') => {
  const apiKey = getApiKey()
  if (!apiKey) {
    console.warn('OpenRouter API key not configured, using mock data')
    return generateMockDescription(project, language)
  }

  try {
    const propertyTypes = {
      apartment: language === 'ru' ? 'роскошную квартиру' : 'luxury apartment',
      villa: language === 'ru' ? 'элегантную виллу' : 'elegant villa',
      penthouse: language === 'ru' ? 'впечатляющий пентхаус' : 'impressive penthouse',
      studio: language === 'ru' ? 'современную студию' : 'modern studio',
      townhouse: language === 'ru' ? 'стильный таунхаус' : 'stylish townhouse'
    }

    const location = project.location || project.tower || (language === 'ru' ? 'престижном районе Дубая' : 'prestigious Dubai area')

    const prompt = language === 'ru'
      ? `Напиши продающее описание недвижимости:

Тип: ${propertyTypes[project.propertyType] || project.propertyType || 'недвижимость'}
Спальни: ${project.bedrooms || 'не указано'}
Санузлы: ${project.bathrooms || 'не указано'}
Площадь: ${project.size} ${project.sizeUnit === 'sqft' ? 'кв. футов' : 'кв. метров'}
Локация: ${location}
Цена: ${project.price} ${project.currency}
Особенности: ${project.customDescription || 'не указаны'}

Напиши 2-3 абзаца текста, который продает эту недвижимость. Используй эмоциональные слова, подчеркни преимущества Дубая. Без списков - только прозу.`
      : `Write a selling property description:

Type: ${propertyTypes[project.propertyType] || project.propertyType || 'property'}
Bedrooms: ${project.bedrooms || 'not specified'}
Bathrooms: ${project.bathrooms || 'not specified'}
Area: ${project.size} ${project.sizeUnit === 'sqft' ? 'sq ft' : 'sq m'}
Location: ${location}
Price: ${project.price} ${project.currency}
Features: ${project.customDescription || 'not specified'}

Write 2-3 paragraphs that sell this property. Use emotional words, highlight Dubai advantages. No lists - prose only.`

    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'DubaiEstate AI'
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          {
            role: 'system',
            content: language === 'ru'
              ? 'Ты - профессиональный риэлтор, специализирующийся на элитной недвижимости в Дубае. Твои описания продают мечту и образ жизни.'
              : 'You are a professional real estate agent specializing in luxury properties in Dubai. Your descriptions sell the dream and lifestyle.'
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error('API request failed')
    }

    const data = await response.json()
    return data.choices[0].message.content.trim()
  } catch (error) {
    console.error('Error generating description:', error)
    return generateMockDescription(project, language)
  }
}

// Generate 3D render using Nano Banana Pro
export const generate3DRender = async (imageUrl, style = 'modern') => {
  const apiKey = getApiKey()
  if (!apiKey) {
    console.warn('OpenRouter API key not configured, using mock data')
    return generateMockImageUrl(style)
  }

  try {
    const stylePrompts = {
      modern: 'contemporary interior, clean lines, neutral colors, floor-to-ceiling windows, modern furniture, Dubai luxury apartment style',
      luxury: 'ultra-luxurious Dubai interior, gold accents, marble floors, crystal chandeliers, designer furniture, penthouse style',
      minimalist: 'minimalist Dubai apartment, white and gray tones, simple furniture, uncluttered space, clean design',
      arabic: 'Arabic luxury villa interior, traditional Arabic patterns, rich colors, Arabic art, luxurious fabrics, Middle Eastern design',
      scandinavian: 'Scandinavian Dubai apartment, light wood, cozy textiles, natural light, functional design, warm atmosphere'
    }

    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'DubaiEstate AI'
      },
      body: JSON.stringify({
        model: 'google/gemini-3-pro-image-preview',
        messages: [
          {
            role: 'user',
            content: `Transform this floor plan into a beautiful 3D interior render in ${style} style. ${stylePrompts[style] || stylePrompts.modern}. Make it photorealistic, well-lit, professional architectural visualization. Dubai real estate.`
          }
        ],
        modalities: ['image', 'text'],
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      throw new Error('Image generation failed')
    }

    const data = await response.json()
    // Response format: data.choices[0].message.images[0] (base64 data URL)
    const imageData = data.choices[0].message.images?.[0]
    if (!imageData) {
      throw new Error('No image in response')
    }
    return imageData
  } catch (error) {
    console.error('Error generating image:', error)
    return generateMockImageUrl(style)
  }
}

// Regenerate description with different tone
export const regenerateDescription = async (originalDescription, options = {}, language = 'ru') => {
  const { tone = 'default', focus } = options

  const tones = {
    default: language === 'ru' ? 'профессиональный и убедительный' : 'professional and persuasive',
    emotional: language === 'ru' ? 'эмоциональный, вызывающий желание жить здесь' : 'emotional, evoking desire to live here',
    investment: language === 'ru' ? 'с акцентом на инвестиционную привлекательность' : 'focusing on investment appeal',
    family: language === 'ru' ? 'семейный, подчеркивающий удобство для детей' : 'family-oriented, highlighting convenience for children'
  }

  const prompt = language === 'ru'
    ? `Перепиши следующее описание в ${tones[tone] || tones.default} стиле. ${focus ? `Сделай акцент на: ${focus}` : ''}\n\n${originalDescription}`
    : `Rewrite the following description in ${tones[tone] || tones.default} tone. ${focus ? `Focus on: ${focus}` : ''}\n\n${originalDescription}`

  return generatePropertyDescription({ customDescription: prompt }, language)
}

// Mock functions for demo/development
const generateMockDescription = (project, language) => {
  if (language === 'ru') {
    return `Роскошная ${project.propertyType || 'квартира'} в самом сердце Дубая с панорамным видом на залив. Современный дизайн, высококачественная отделка и просторные комнаты создают атмосферу комфорта и элегантности.

Расположенная в престижном ${project.location || 'районе'}, эта ${project.bedrooms || 'просторная'} квартира предлагает идеальное сочетание роскоши и удобства. ${project.size ? `Общая площадь ${project.size} кв. футов` : 'Просторные комнаты'} позволяют наслаждаться каждым моментом.

Не упустите возможность стать владельцем этой эксклюзивной недвижимости в одном из самых желанных районов Дубая!`
  }

  return `Luxurious ${project.propertyType || 'apartment'} in the heart of Dubai with panoramic views of the bay. Modern design, high-quality finishes, and spacious rooms create an atmosphere of comfort and elegance.

Located in prestigious ${project.location || 'area'}, this ${project.bedrooms || 'spacious'} apartment offers the perfect combination of luxury and convenience. ${project.size ? `Total area of ${project.size} sq ft` : 'Spacious rooms'} allow you to enjoy every moment.

Don't miss the opportunity to become the owner of this exclusive property in one of Dubai's most desirable areas!`
}

const generateMockImageUrl = (style) => {
  const colors = {
    modern: { bg: '#e8e8e8', primary: '#2a5a8a', secondary: '#87ceeb', accent: '#4a90a4' },
    luxury: { bg: '#1a1a1a', primary: '#8b7355', secondary: '#d4af37', accent: '#8b4513' },
    minimalist: { bg: '#f5f5f5', primary: '#666666', secondary: '#999999', accent: '#cccccc' },
    arabic: { bg: '#2d1f1f', primary: '#8b0000', secondary: '#d4af37', accent: '#4a2c2a' },
    scandinavian: { bg: '#f0ebe5', primary: '#8b7355', secondary: '#deb887', accent: '#d2b48c' }
  }

  const c = colors[style] || colors.modern

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
      <rect fill="${c.bg}" width="512" height="512"/>
      <rect fill="${c.primary}" x="40" y="40" width="432" height="340" rx="8"/>
      <rect fill="${c.secondary}" x="60" y="60" width="120" height="100" opacity="0.4" rx="4"/>
      <rect fill="${c.secondary}" x="200" y="60" width="120" height="100" opacity="0.4" rx="4"/>
      <rect fill="${c.accent}" x="60" y="200" width="160" height="140" rx="4"/>
      <rect fill="${c.accent}" x="240" y="200" width="192" height="140" rx="4"/>
      <text x="256" y="460" text-anchor="middle" fill="${c.primary}" font-family="Arial" font-size="24" font-weight="bold">3D Render - ${style}</text>
      <text x="256" y="490" text-anchor="middle" fill="${c.primary}" font-family="Arial" font-size="16">DubaiEstate AI</text>
    </svg>
  `)}`
}

export default {
  generatePropertyDescription,
  generate3DRender,
  regenerateDescription
}
