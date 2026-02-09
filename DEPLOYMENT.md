# Deployment Guide for Reality Fabric Auditor

Follow these steps to deploy your full-stack application for free.

## 1. Prerequisites (GitHub)
Ensure your code is pushed to a GitHub repository.

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

## 2. Deploy Backend (Render)
Render is perfect for Node.js backends because it supports WebSockets (which your app uses) and long-running processes.

1.  Go to [Render Dashboard](https://dashboard.render.com/) and create a **New Web Service**.
2.  Connect your GitHub repository.
3.  **Crucial Settings**:
    *   **Name**: `reality-backend` (or similar)
    *   **Root Directory**: `reality-fabric-auditor/backend` (Important! Check your repo structure. If the root `package.json` is inside `backend`, use this path. If your repo starts inside `reality-fabric-auditor`, adjust accordingly. Based on your project, it seems to be inside `reality-fabric-auditor/backend`).
    *   **Runtime**: Node
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
    *   **Instance Type**: Free
4.  **Environment Variables**:
    *   Add `GEMINI_API_KEY`: Only if you intend to use the real Gemini API.
    *   Add `NODE_ENV`: `production`
5.  Click **Create Web Service**.
6.  Wait for deployment. Once live, **copy the Backend URL** (e.g., `https://reality-backend.onrender.com`).

## 3. Deploy Frontend (Vercel)
Vercel is optimized for frontend frameworks like React/Vite.

1.  Go to [Vercel Dashboard](https://vercel.com/new).
2.  Import your GitHub repository.
3.  **Project Settings**:
    *   **Framework Preset**: Vite
    *   **Root Directory**: Click "Edit" and select `reality-fabric-auditor/frontend`.
4.  **Environment Variables**:
    *   Add `VITE_API_URL`: Paste your **Backend URL** from step 2 (e.g., `https://reality-backend.onrender.com`).
        *   *Note: Do not add a trailing slash or `/api`. The code handles it.*
    *   Add `VITE_SOCKET_URL`: Paste the same URL if you want explicit control (optional, code falls back to `VITE_API_URL` or localhost).
5.  Click **Deploy**.

## 4. Final Configuration
1.  Once the Frontend is deployed, copy its URL (e.g., `https://reality-frontend.vercel.app`).
2.  Go back to **Render Dashboard** -> Your Backend Service -> **Environment**.
3.  Add/Update `FRONTEND_URL` with your Vercel URL (e.g., `https://reality-frontend.vercel.app`). This ensures CORS allows requests from your frontend.
4.  **Redeploy** the backend if needed (Render usually auto-deploys on push, but env var changes restart it automatically).

## 5. Verification
1.  Open your Vercel URL.
2.  Login with the credentials found in `backend/src/server.js` (e.g., `muqsit@realityfabric.ai` / `Muqsit@123`).
3.  Check the Dashboard. The Camera implementation might require HTTPS (which Render/Vercel provide automatically).
4.  Test the "Gemini Analysis" button.

---

## Option 3: Deploy Frontend to Netlify (Recommended Alternative)

If Vercel gives you trouble, Netlify is a great alternative.

### Method A: Manual Drag & Drop (Fastest)

1.  **Build the project locally:**
    ```bash
    cd frontend
    npm run build
    ```
2.  Open your file explorer and find `frontend/dist`.
3.  Go to [Netlify Drop](https://app.netlify.com/drop).
4.  Drag and drop the `dist` folder onto the page.
5.  **Done!** Netlify will give you a live URL instantly.

### Method B: Connect Git (Automatic)

1.  Push your code to GitHub (if GitHub is working).
2.  Log in to [Netlify](https://app.netlify.com/).
3.  Click **"Add new site"** > **"Import from an existing project"**.
4.  Select **GitHub** and choose your repository: `Reality_fabric_auditor`.
5.  **Configure Build Settings:**
    *   **Base directory:** `frontend`
    *   **Build command:** `npm run build`
    *   **Publish directory:** `dist`
6.  **Add Environment Variables:**
    *   Click **"Add environment variable"**.
    *   Key: `VITE_API_URL`
    *   Value: `https://reality-backend.onrender.com` (Or your Render URL)
7.  Click **"Deploy"**.

**Note:** I have already added a `_redirects` file so routing will work automatically.

