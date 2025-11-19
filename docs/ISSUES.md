# Card Counter — Full Issue List

This file contains all issues needed to build the Card Counter training app from MVP to expert-level training tools.  
Each section can be copied directly into individual GitHub Issues.

---

## 1. Fix Missing index.html and Initialize React Frontend
**Description:**  
The app fails to start due to missing `public/index.html`. Recreate it using Create React App defaults and confirm that `npm start` runs without errors.

**Acceptance Criteria:**  
- `index.html` is present  
- App launches on http://localhost:3000  
- No browserlist or F_OK errors  

---

## 2. Create Basic Folder Structure for Trainer App
**Description:**  
Add a clean, maintainable folder structure for the React frontend.

**Acceptance Criteria:**  
- Create `/components`, `/hooks`, `/context`, `/utils`, `/screens`  
- Add placeholder files such as `Trainer.js`, `index.js`, etc.

---

## 3. Implement Running Count Logic (Hi-Lo System)
**Description:**  
Implement a pure function to compute the Hi-Lo running count.

**Acceptance Criteria:**  
- 2–6 → +1  
- 7–9 → 0  
- 10–A → -1  
- Unit tests included  
- Export from `utils/cardCounter.js`

---

## 4. Add True Count Calculation
**Description:**  
Implement logic for true count conversion based on decks remaining.

**Acceptance Criteria:**  
- `getTrueCount(runningCount, decksRemaining)` returns correct values  
- Unit tests included  

---

## 5. Shuffle Simulation
**Description:**  
Build a shoe shuffle system with realistic casino penetration.

**Acceptance Criteria:**  
- Adjustable number of decks (1–8)  
- Shuffle triggers automatically at chosen penetration %

---

## 6. Flashcard Mode — Single Card Trainer
**Description:**  
Show single cards rapidly. User classifies as -1, 0, +1.

**Acceptance Criteria:**  
- Adjustable speed  
- Instant feedback  
- Accuracy tracked per session  

---

## 7. Rapid Count Drift Trainer
**Description:**  
Show a continuous stream of cards. User maintains running count.

**Acceptance Criteria:**  
- Random checkpoints ask “What’s the current count?”  
- Drift recorded  
- Speed adjustable

---

## 8. True Count Conversion Trainer
**Description:**  
Display running count + decks remaining. User must enter true count.

**Acceptance Criteria:**  
- Random deck estimations  
- Instant feedback  

---

## 9. Casino Simulation Mode
**Description:**  
Simulate multi-hand blackjack with running count practice.

**Acceptance Criteria:**  
- Multi-player dealing animation  
- User can check count on demand  
- Drift tracked over long sessions  

---

## 10. Speed Ramping Algorithm
**Description:**  
Automatically increase difficulty based on user performance.

**Acceptance Criteria:**  
- Speed increases when accuracy > 90%  
- Minimum card display time ~150ms  

---

## 11. Distraction Mode
**Description:**  
Simulate casino-level distraction environments.

**Acceptance Criteria:**  
- Background crowd audio  
- Random dealer voice lines  
- Occasional visual distractions  

---

## 12. Stealth Counting Mode
**Description:**  
User is shown cards but only answers at the end.

**Acceptance Criteria:**  
- No prompts until shoe ends  
- User reports final running + true count  
- Drift tracked  

---

## 13. Multi-System Support (Omega II, Zen, KO)
**Description:**  
Add support for advanced counting systems.

**Acceptance Criteria:**  
- Dropdown menu to choose system  
- Logic updates dynamically  
- System choice saved to local storage  

---

## 14. Long-Term Performance Tracking
**Description:**  
Store user performance over time.

**Acceptance Criteria:**  
- Use IndexedDB or localStorage  
- Track drift, speed, accuracy  
- Stats dashboard  

---

## 15. Build Mastery Score
**Description:**  
Create a single metric (0–100) combining drift, speed, and accuracy.

**Acceptance Criteria:**  
- Transparent formula  
- Display on dashboard  
- Updates after each session  

---

## 16. Add Simple Flask Backend (Optional)
**Description:**  
Add backend support for user accounts and stat syncing.

**Acceptance Criteria:**  
- JWT authentication  
- Endpoints: login, saveSession, getStats  
- Heroku-ready  

---

## 17. Deploy Frontend to Vercel or GitHub Pages
**Description:**  
Deploy the React frontend for public testing.

**Acceptance Criteria:**  
- App live on `card-counter.vercel.app` or GitHub Pages  
- CI/CD pipeline set up on `main`

---

## 18. Minimalist Dark Theme UI
**Description:**  
Design clean, modern, casino-style UI.

**Acceptance Criteria:**  
- Consistent theme  
- Smooth animations  
- Mobile-friendly  

---

## 19. Metronome Trainer
**Description:**  
Pace subconscious counting with a metronome audio track.

**Acceptance Criteria:**  
- Adjustable BPM  
- Toggle on/off

---

## 20. Haptic Feedback (Mobile)
**Description:**  
Provide subtle vibration cues for feedback and checkpoints.

**Acceptance Criteria:**  
- Uses navigator.vibrate  
- Works on mobile browsers that support vibration

---
