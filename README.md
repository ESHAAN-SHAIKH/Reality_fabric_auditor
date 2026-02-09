Reality Auditor v2.0 is a real-time AI surveillance system that uses a live camera feed and Gemini 2.5 Vision AI to analyze environmental trust and security.

Core features to include:
- Live camera feed using browser getUserMedia
- Real-time AI analysis via Gemini 2.5 Flash Vision API
- People count detection (0–5+)
- Movement analysis (none / low / high)
- Lighting condition detection (Well Lit / Low Light / Very Dim)
- AI confidence scoring with thresholds
- Critical alert when confidence drops below 25%
- Pulsing red alert UI
- JSON and CSV audit export with timestamps and screenshots
- Mobile-first responsive dashboard

Tech stack:
Frontend:
- React 18
- TailwindCSS
- Lucide React Icons
- Canvas API

Backend:
- Node.js
- Express
- Gemini 2.5 Flash Vision API

Architecture:
Camera → Canvas → Base64 → Gemini 2.5 → Backend → React Dashboard → Audit Exports

Include sections:
- Project overview (simple, judge-friendly)
- What the system does (30-second explanation)
- Live demo flow (step-by-step)
- Why this project matters (problem + differentiation)
- System architecture (text diagram)
- Confidence threshold table
- Hackathon and real-world use cases
- Local setup instructions
- Why judges love this project
- Future improvements
- Final summary statement