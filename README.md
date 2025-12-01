# 🌪️ GitHub Entropy Stats

> **"Stop using boring grid tables. Embrace the chaos."**

A self-hostable, serverless API that generates a **Chaotic "Messy Desk" Dashboard** for your GitHub profile. Unlike standard stat cards, this visualizes your "Seniority" and "Impact" using a dynamic, sticker-bombed aesthetic.

![Entropy Stats Preview](https://via.placeholder.com/800x400.png?text=Preview+of+Chaotic+Stats+Card)
*(Replace this link with a screenshot of your actual generated SVG once deployed)*

## ✨ Features

* **The "Seniority" Score:** A unique algorithm that weights Code Reviews and Discussion Answers higher than simple Commits.
* **Chaotic Design:** Rotated elements, sticky notes, and stamps—no two elements align perfectly.
* **High Performance:** Serverless (Vercel) + SVG generation (no Puppeteer/Headless browser needed).
* **Privacy First:** You host it. You use your own Token. No third-party tracking.

---

## 🚀 Quick Start (Deploy Your Own)

You can deploy your own instance for free on Vercel. This ensures you use your own API rate limits.

### 1. Click the Deploy Button
This will clone this repository to your GitHub account and setup a project on Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shobith-s/chaotic-container&env=GH_TOKEN)

*(Note: Replace `YOUR_USERNAME/YOUR_REPO_NAME` in the link above with your actual repo details after you push this code)*

### 2. Configure Environment Variables
During the deployment process, Vercel will ask for a `GH_TOKEN`.

#### How to get a GitHub Token:
1.  Go to **GitHub Settings** > **Developer settings** > **Personal access tokens** > **Tokens (classic)**.
2.  Click **Generate new token (classic)**.
3.  Name it "Entropy Stats".
4.  **Select Scopes:**
    * ✅ `read:user` (Required for profile stats)
    * ✅ `repo` (Required if you want to count private contributions, otherwise optional)
5.  Click **Generate token** and copy the string (starts with `ghp_...`).
6.  Paste this into the Vercel **GH_TOKEN** field.

### 3. Add to your Profile
Once deployed, Vercel will give you a domain (e.g., `https://my-chaos-stats.vercel.app`). Add this to your personal `README.md`:

```markdown
![My Chaos Stats](https://your-vercel-domain.vercel.app/api?username=YOUR_GITHUB_USERNAME)
