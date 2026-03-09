# Step-by-Step: Push Eco Tech to GitHub

## Step 1: Open terminal in the project folder

- In VS Code/Cursor: **Terminal → New Terminal**
- Or open PowerShell/Command Prompt and go to the folder:
  ```bash
  cd C:\Users\USER\Documents\ECOSUR\ecotech
  ```

---

## Step 2: Initialize Git (if not already)

```bash
git init
```

This creates a `.git` folder and makes `ecotech` a Git repository.

---

## Step 3: Add all files

```bash
git add .
```

To see what will be committed:
```bash
git status
```

---

## Step 4: First commit

```bash
git commit -m "Initial commit: Eco Tech frontend - waste disposal & rewards"
```

---

## Step 5: Create a repository on GitHub

1. Go to **https://github.com**
2. Log in (or create an account).
3. Click the **"+"** (top right) → **"New repository"**.
4. Fill in:
   - **Repository name:** `ecotech` (or e.g. `eco-tech-app`)
   - **Description:** (optional) e.g. "Smart waste disposal & rewards app"
   - **Public** or **Private** – your choice.
   - **Do not** check "Add a README" (you already have one).
5. Click **"Create repository"**.

---

## Step 6: Connect local repo to GitHub

GitHub will show commands; use these (replace `YOUR_USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/ecotech.git
```

If you use SSH instead:
```bash
git remote add origin git@github.com:YOUR_USERNAME/ecotech.git
```

Check that it’s set:
```bash
git remote -v
```

---

## Step 7: Push to GitHub

Rename branch to `main` (if needed) and push:

```bash
git branch -M main
git push -u origin main
```

- If GitHub asks for login, use your GitHub username and a **Personal Access Token** (not your password).
- To create a token: GitHub → **Settings → Developer settings → Personal access tokens → Generate new token**. Give it `repo` scope.

---

## Done

Refresh the repository page on GitHub; you should see all your Eco Tech files.

---

## Later: make more changes and push again

```bash
git add .
git commit -m "Describe your change"
git push
```
