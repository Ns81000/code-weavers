# Code Weaver's Quick-Cache

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E=14.0.0-green.svg)
![Pastebin API](https://img.shields.io/badge/Pastebin-API-orange)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

> **A secure, modern, and ephemeral online notepad for code snippets and text, powered by Pastebin.**

---

## ✨ Features

- **Modern Dark Theme**: Sleek, coder-focused UI with a beautiful dark mode.
- **Advanced Code Editor**: (Optional: Integrate CodeMirror for line numbers, syntax highlighting, and more.)
- **Syntax Highlighting**: Real-time preview with support for many languages (JS, Python, HTML, CSS, etc.).
- **Pastebin Integration**: Save notes securely and temporarily via a Node.js proxy server.
- **Expiration Control**: Set how long your note lasts (10 min, 1 hour, 1 day, 1 week, never).
- **Privacy Options**: Choose between Unlisted (default) and Public pastes.
- **One-Click Copy & Vanish**: Copy your paste link and instantly clear the editor.
- **Accessibility**: Keyboard navigation, ARIA labels, and responsive design.
- **Help/About Modal**: Built-in user guide.
- **Toast Notifications**: Friendly feedback for actions and errors.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript, [highlight.js](https://highlightjs.org/)
- **Backend**: Node.js, Express, CORS, node-fetch, dotenv
- **API**: [Pastebin API](https://pastebin.com/doc_api)

---

## 📦 Project Structure

```
.
├── index.html         # Main frontend UI
├── style.css          # Dark theme and layout
├── script.js          # Frontend logic
├── proxy-server.js    # Node.js/Express proxy for Pastebin API
├── package.json       # Backend dependencies
├── .env.example       # Pastebin API key
└── README.md          # This file
```

---

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Ns81000/code-weavers.git
cd code-weavers
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Configure Pastebin API Key

- Get your [Pastebin API Developer Key](https://pastebin.com/doc_api)
- Copy `.env.example` to `.env` and fill in your key:

```bash
cp .env.example .env
```

Edit `.env` and set:

```
PASTEBIN_API_KEY=your_pastebin_api_key_here
```

### 4. Start the Proxy Server

```bash
node proxy-server.js
```
- The server will run at [http://localhost:3001](http://localhost:3001)

### 5. Open the App

- Open `index.html` in your browser (double-click or use a local server like Live Server for best results).

---

## 📝 Usage

1. Type or paste your code/text in the editor.
2. Select syntax highlighting, expiration, paste name, and privacy.
3. Click **Save Note**.
4. Copy the generated Pastebin link with **Copy Link & Vanish**.
5. Use the **?** button for help/about.

---

## 🔒 Security & Privacy
- Your Pastebin API key is **never exposed to the frontend**.
- All notes are sent directly to Pastebin via a secure proxy.
- No note content is stored on this site or server.

---

## 🌐 Supported Syntax Highlighting Languages
- Plain Text, JavaScript, TypeScript, Python, Java, C++, C#, PHP, Ruby, Go, Bash, JSON, Markdown, HTML, CSS

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements
- [Pastebin](https://pastebin.com/)
- [highlight.js](https://highlightjs.org/)
- [Node.js](https://nodejs.org/)

---

## 💡 FAQ

**Q: Is my note private?**  
A: If you select "Unlisted", only those with the link can view it. "Public" pastes are visible on Pastebin's public archive.

**Q: Can I use this for sensitive data?**  
A: This is for temporary, non-sensitive code snippets. Do not use for passwords or confidential information.

**Q: Can I run this on a server?**  
A: Yes! You can deploy the proxy server to any Node.js-compatible host. Just keep your `.env` file secure.

---

> _Made with ❤️ for coders who need a quick, secure scratchpad._ 
