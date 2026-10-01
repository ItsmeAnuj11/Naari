# दिशा (Disha) — Voice-First Government Scheme Navigator

> "She is talking to a kind, patient local helper." — Not a chatbot.

**Disha** is a voice-first AI assistant that helps first-time rural Indian women discover government scheme eligibility, understand required documents, and know where to go — all through natural Hindi conversation.

## 🎯 What It Does

A woman who has never used the internet opens the app, taps one button, speaks in Hindi, and the app:

1. **Asks simple questions** about her situation (one at a time)
2. **Tells her if she may be eligible** (never guarantees)
3. **Shows her what documents she needs** (with icons, 3 at a time)
4. **Tells her where to go** (Anganwadi center, helpline)

Default scheme: **PM Matru Vandana Yojana (PMMVY)** — maternity benefit for pregnant women.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Install and Run

```bash
cd app-build
npm install
npm run dev
```

Open http://localhost:3000 on your phone or in a mobile-width browser.

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| GEMINI_API_KEY | For AI mode | Your Google Gemini API key |
| DEMO_MODE | No | Set to true for reliable demo without API |

### Demo Mode

Set DEMO_MODE=true in .env.local for reliable demo without API calls.

### Change Scheme

Edit config/app.json and set the scheme field. Add new scheme files at data/schemes/.

### Change Language

Edit config/app.json and set the language field.

## 🏗 Architecture

Browser -> Microphone -> Web Speech API (STT) -> Server API -> Gemini -> Grounded Scheme Data -> Validated Response -> Web Speech API (TTS) -> Audio

### Grounding

All government facts come from data/schemes/pmmvy.json with source URLs and verification dates.

## 🔒 Privacy

- No login or accounts
- No stored recordings or transcripts
- No sensitive identity data collection
- Session-only conversation
- API keys server-side only

## 🎪 Hackathon Demo

1. Set DEMO_MODE=true
2. Run npm run dev
3. Open on phone
4. Hand the phone to someone
5. Press Ctrl+Shift+D for debug panel

## 📊 Data Sources

All scheme data verified from official government sources (pmmvy.wcd.gov.in, wcd.nic.in, pib.gov.in, vikaspedia.in).
