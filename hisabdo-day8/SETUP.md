# Setup Guide — HisabDo Web Capstone

Everything you need installed on your **system** and in **VS Code** to work on this project comfortably.

---

## 1. System-level software (install once, outside VS Code)

| Software | Why you need it | Check if installed | Install |
|---|---|---|---|
| **Node.js (LTS, v18 or v20)** | Runs Next.js, npm, and the Express server | `node -v` | https://nodejs.org (choose LTS) |
| **npm** (comes with Node.js) | Package manager | `npm -v` | Included with Node.js |
| **Git** | Version control, pushing to GitHub | `git -v` | https://git-scm.com/downloads |
| **MongoDB** (choose one) | Database for customers/transactions/users | — | Option A: local install https://www.mongodb.com/try/download/community • Option B (recommended for this project): free cloud cluster at https://www.mongodb.com/cloud/atlas — no local install needed |
| **Postman or Thunder Client** | Testing API endpoints before the frontend is wired up | — | Postman: https://www.postman.com/downloads/ (or use the Thunder Client VS Code extension below — no separate install needed) |

You do **not** need to install Next.js, React, Express, Mongoose, etc. globally — those are all project dependencies pulled in by `npm install` from `package.json`, and live inside `node_modules/`.

### Quick check-all command
Open any terminal (not VS Code yet) and run:
```bash
node -v
npm -v
git -v
```
If any of these say "command not found," install that piece first.

---

## 2. VS Code extensions

This project includes a `.vscode/extensions.json`. **When you open the project folder in VS Code, it should automatically show a popup: "This workspace has extension recommendations." Click "Install All".**

If the popup doesn't appear, open the Extensions panel (`Ctrl+Shift+X`), type `@recommended`, and install everything listed there.

| Extension | Purpose |
|---|---|
| **ESLint** (dbaeumer.vscode-eslint) | Flags code errors/style issues as you type |
| **Prettier** (esbenp.prettier-vscode) | Auto-formats code on save (already configured) |
| **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss) | Autocomplete + hover previews for Tailwind classes |
| **ES7+ React/Redux/JS Snippets** (dsznajder.es7-react-js-snippets) | Fast component boilerplate (type `rafce` + Tab) |
| **MongoDB for VS Code** (mongodb.mongodb-vscode) | Browse your database and run queries without leaving the editor |
| **GitLens** (eamodio.gitlens) | See commit history/blame inline |
| **Error Lens** (usernamehw.errorlens) | Shows errors/warnings inline instead of just in the Problems tab |
| **Path Intellisense** (christian-kohler.path-intellisense) | Autocompletes import paths |
| **EditorConfig** (editorconfig.editorconfig) | Keeps formatting consistent across team members' editors |
| **DotENV** (mikestead.dotenv) | Syntax highlighting for `.env` files |
| **Auto Rename Tag** | Renames matching JSX/HTML tags together |
| **Thunder Client** (rangav.vscode-thunder-client) | Test API endpoints directly inside VS Code (Postman alternative) |
| **Pretty TS Errors** | Makes TypeScript error messages actually readable |

---

## 3. First-time project setup (after cloning/extracting)

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
copy .env.example .env.local        # Windows
# cp .env.example .env.local        # Mac/Linux

# 3. Fill in .env.local with your MongoDB connection string (Atlas or local)

# 4. Start the frontend
npm run dev
# → open http://localhost:3000
```

The Express backend (`server/`) doesn't have an entry file yet (`server/index.js`) — that gets built in an upcoming milestone. You don't need it running to view the Next.js frontend.

---

## 4. Recommended VS Code workflow

- **Format on save is already enabled** (via `.vscode/settings.json`) — just save (`Ctrl+S`) and Prettier formats the file.
- Use the built-in terminal (`` Ctrl+` ``) instead of a separate terminal app — keeps everything in one window.
- Use **GitLens**'s Source Control tab (left sidebar) instead of typing every git command — though the terminal works fine too.
- If Tailwind classes aren't autocompleting, make sure you're editing a `.tsx` file inside `app/` or `components/` (that's what `tailwind.config.js` is scoped to).

---

## 5. Troubleshooting

- **"0 bytes" or empty files after extracting a zip on Windows** → Windows' built-in "Extract All" sometimes mishandles folders with parentheses in the name (e.g. `(marketing)`). Use 7-Zip (https://www.7-zip.org/) instead: right-click the zip → 7-Zip → Extract Here.
- **`next dev` fails with "port 3000 already in use"** → run `npm run dev -- -p 3001` to use a different port, or close whatever else is using 3000.
- **TypeScript red squiggles everywhere right after install** → reload the window (`Ctrl+Shift+P` → "Developer: Reload Window") so VS Code picks up the newly installed types.
