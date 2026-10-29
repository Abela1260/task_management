# Deploying TaskFlow to Render

This app is configured and ready for 1-click or manual deployment to **[Render](https://render.com)** as a **Static Site**.

---

## ⚡ Method 1: Automatic Deployment with Render Blueprint (Recommended)

Because the repository includes a [`render.yaml`](file:///c:/Users/aa/Desktop/project/render.yaml), Render can automatically configure the service:

1. Push your repository to **GitHub** or **GitLab**.
2. Log in to the **[Render Dashboard](https://dashboard.render.com)**.
3. Click **New +** and select **Blueprint**.
4. Connect your repository.
5. Render will automatically read `render.yaml` and configure:
   - **Type**: Static Site
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Rewrite Rules**: SPA fallback `/* -> /index.html`
6. Click **Apply**. Your app will build and deploy!

---

## 🛠️ Method 2: Manual Setup via Render Dashboard

If you prefer to configure it manually:

1. In Render Dashboard, click **New +** → **Static Site**.
2. Connect your Git repository.
3. In the settings form, configure:
   - **Name**: `taskflow` (or your choice)
   - **Branch**: `main`
   - **Root Directory**: `frontend` *(important!)*
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Expand **Advanced** → **Redirects/Rewrites**:
   - Add a Rule:
     - **Type**: `Rewrite`
     - **Source**: `/*`
     - **Destination**: `/index.html`
   *(Note: The app also includes a `public/_redirects` file that Render automatically honors).*
5. Click **Create Static Site**.

---

## 📁 Key Deployment Files Included

- [`render.yaml`](file:///c:/Users/aa/Desktop/project/render.yaml): Render Blueprint definition with cache headers and routing.
- [`frontend/public/_redirects`](file:///c:/Users/aa/Desktop/project/frontend/public/_redirects): Native Render rewrite rule so refreshing any URL properly renders the React app.
- [`package.json`](file:///c:/Users/aa/Desktop/project/package.json): Root package script fallback if root directory is left blank.
- [`.gitignore`](file:///c:/Users/aa/Desktop/project/.gitignore): Ensures build artifacts and `node_modules` are not pushed to Git.
