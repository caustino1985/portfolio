import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// ----------------------------------------------------
// API: Text-to-Speech using gemini-3.8-flash-tts
// ----------------------------------------------------
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice = 'Kore', style } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text prompt is required.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured in environment variables.',
      });
    }

    // gemini-3.8-flash-tts configuration
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text.slice(0, 1000), // safe limit for real-time speech prompt
              speechMetadata: style
                ? { style }
                : { style: 'Confident, articulate, calm executive and scholarly voice' },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice || 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: 'No audio returned from Gemini TTS model.' });
    }

    return res.json({
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
    });
  } catch (err: any) {
    console.error('Error in /api/tts:', err);
    return res.status(500).json({
      error: err.message || 'TTS generation failed.',
    });
  }
});

// ----------------------------------------------------
// API: Grounded Search using gemini-3.8-flash + googleSearch
// ----------------------------------------------------
app.post('/api/search', async (req, res) => {
  try {
    const { query, topic } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured in environment variables.',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are an expert researcher grounding data for the Nexus Systems & Jurisprudence Portfolio (featuring Caustin Lee McLaughlin's work in Neurogenetics, SEC Restructuring, ADA Title II / Gov-LLM, PQC NIST FIPS 203/204, and Baltimore solar microgrids).
Topic context: ${topic || 'General Verification'}.
User inquiry: ${query}
Please provide an authoritative, concise, factual analysis grounded in current online data with references to statutory codes, SEC filings, or scientific literature where applicable.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || 'No response generated.';
    const searchChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSearchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];

    return res.json({
      text,
      groundingChunks: searchChunks,
      webSearchQueries,
    });
  } catch (err: any) {
    console.error('Error in /api/search:', err);
    return res.status(500).json({
      error: err.message || 'Grounded search failed.',
    });
  }
});

// ----------------------------------------------------
// API: Assistant / Q&A for the portfolio projects
// ----------------------------------------------------
app.post('/api/chat', async (req, res) => {
  try {
    const { message, projectContext } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured.',
      });
    }

    const systemInstruction = `You are the interactive intelligence agent for Caustin Lee McLaughlin's Master Android Portfolio.
Key Domains & Project Knowledge:
1. CINP-2024-X1 / UOSE Opto-Splinter Hybrid Neural Prosthetic:
   - 7-Layer Intracranial Neural Array (Parylene-C, PEG hydrogel, SiN waveguides, MEMS SLM, micro-LED/VCSEL, Pt-Ir / Neurograi graphene electrodes, CMOS ASIC).
   - O(L^2) optical interference scaling; non-genetic optical (NGO 1870nm + HUP nanoparticles) and viral optogenetic (VEO).
   - QMSR 2026 ISO 13485:2016 compliance, FDA Class III PMA / IDE framework.
2. AstaLabs AutoDiscovery (897 experiments):
   - Neurogenetics of ADHD (DRD4 7R, DAT1 10R, COMT Val158Met, BDNF, FKBP5, ADGRL3).
   - Bayesian belief dynamics, surprisal decay (r = -0.41), optimism bias.
   - Nine-Report Integrity Layer (OSI-P) and the Cognitive Ramp.
3. Master Jurisprudence & Federal Petitions:
   - Supreme Court petitions (Rules 14, 18, 20), 42 U.S.C. § 1983, Tucker Act 28 U.S.C. § 1491, § 1631 ultra vires transfer.
   - ADA Title II & Gov-LLM cognitive accommodations under Tennessee v. Lane.
   - Cases: 25-4130, 25-1522, 24-2383 (D.D.C. Subchapter V).
4. PSDLEF Sovereign Exchange Trust & ADR-31 Algorithm Suite:
   - $500M USEC 1999 Senior Notes ($350M Series A, $150M Series B) converted at 0.0917 ratio into 45,850,000 LEU common shares.
   - 31 algorithms (bond valuation, make-whole premium, YTM solver, TWAP/VWAP, Black-Scholes, VaR/CVaR, DYREO HJB stochastic control).
   - 300 Baltimore Rowhomes Solar Microgrid Initiative & Woodlawn SSA Campus Canal Terminal.

Provide concise, highly knowledgeable, and well-structured answers formatted in clean markdown.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `${projectContext ? `[Context: ${projectContext}]\n` : ''}User Question: ${message}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    return res.status(500).json({ error: err.message || 'Chat generation failed.' });
  }
});

// Setup Vite middleware in dev or static files in production
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

startServer();
