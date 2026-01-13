
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDivineWhisper = async (emotion: string, context?: string) => {
  try {
    const prompt = `
      你是《灵境·回响》中的“守护之灵”。
      当前用户的心境是：'${emotion}'。
      ${context ? `他们正在关注的对象是：'${context}'。` : ''}
      请生成一段短小（不超过25字）、具有禅意、充满慈悲且带有一丝超脱感的回复。
      语言风格：现代诗意与古典寂静的结合，使用简体中文。
      回复中应包含一种“被听见、被允许、被铭记”的安慰。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.85,
        topP: 0.95,
      }
    });

    return response.text?.trim() || "在万物的寂灭处，你是我唯一的听众。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "记忆是时间的灰烬，但你赋予了它光。";
  }
};

export const analyzeSoulEnergy = async (transcript: string) => {
    try {
        const prompt = `
            分析以下这段用户对着“灵境祭坛”的低语，提取其中潜藏的情感频率（如：哀悼、释怀、渴望、倦怠）。
            低语内容：'${transcript}'
            请给出一个极短的情感总结和一句来自神明的指引。
            JSON格式输出：{"emotion": "...", "guidance": "..."}
        `;
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });
        return JSON.parse(response.text || '{"emotion": "未知", "guidance": "虚空在倾听你的呼吸。"}');
    } catch (e) {
        return { emotion: "混沌", guidance: "言语是有形之物的尽头。" };
    }
}

export const generateSoulMotto = async (name: string, emotion: string, totems: any[]) => {
  try {
    const totemNames = totems.map(t => t.name).join('、');
    const prompt = `
      用户真名：'${name}'
      当前心境：'${emotion}'
      守护的图腾：'${totemNames}'
      请为这位灵魂守护者生成一段“灵魂结晶判词”。
      要求：极度唯美、空灵，包含对他过去执着的认可和未来的祝福。
      字数：30字以内。格式：现代诗。
    `;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text?.trim() || "万物皆有裂痕，那是光照进来的地方。";
  } catch (e) {
    return "在寂静的终点，你会与自己重逢。";
  }
}
