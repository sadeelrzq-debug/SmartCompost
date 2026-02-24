import { GoogleGenAI, Type } from "@google/genai";
import { WasteAnalysisInput, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const analyzeWaste = async (input: WasteAnalysisInput): Promise<AnalysisResult> => {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "أنت خبير بيئي متخصص في التحلل الحيوي وإدارة النفايات العضوية. مهمتك هي تحليل مدخلات المستخدم (نص، صورة، صوت) وتقديم تقييم دقيق حول إمكانية تحويل النفايات إلى سماد عضوي، مع تقديم نصائح علمية وعملية.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          status: { type: Type.STRING, enum: ['compostable', 'needs_improvement', 'not_compostable'] },
          score: { type: Type.NUMBER },
          explanation: { type: Type.STRING },
          instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
          scientificReasoning: { type: Type.STRING }
        },
        required: ["status", "score", "explanation", "instructions", "scientificReasoning"]
      }
    },
    contents: [
      {
        parts: [
          {
            text: `أنت خبير في التحلل الحيوي وصناعة السماد العضوي. قم بتحليل البيانات التالية لنفايات عضوية وحدد مدى صلاحيتها للتحويل إلى سماد:
            - نوع النفايات: ${input.type}
            - اللون الحالي: ${input.color}
            - الرائحة: ${input.smell}
            - عدد الأيام منذ تركها: ${input.days}
            ${input.voiceDescription ? `- وصف إضافي من المستخدم: ${input.voiceDescription}` : ""}
            
            بناءً على هذه المعطيات، قدم تحليلاً علمياً دقيقاً باللغة العربية.
            التصنيفات المتاحة:
            1. compostable: صالحة للتحويل إلى سماد فوراً.
            2. needs_improvement: تحتاج إلى تعديل (مثل إضافة مواد كربونية أو تهوية).
            3. not_compostable: غير صالحة (قد تكون ملوثة أو تحتوي على مواد تمنع التحلل).`
          },
          ...(input.image ? [{
            inlineData: {
              mimeType: "image/jpeg",
              data: input.image.split(',')[1]
            }
          }] : [])
        ]
      }
    ]
  });

  const response = await model;
  return JSON.parse(response.text || "{}") as AnalysisResult;
};

export const transcribeAudio = async (audioBase64: string): Promise<string> => {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          { text: "حول هذا التسجيل الصوتي باللغة العربية إلى نص مكتوب بدقة. النص يتعلق بوصف نفايات عضوية." },
          {
            inlineData: {
              mimeType: "audio/webm",
              data: audioBase64
            }
          }
        ]
      }
    ]
  });

  const response = await model;
  return response.text || "";
};
