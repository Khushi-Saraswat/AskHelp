
---

# 🔍 Smart Research Assistant (Chrome Extension)

Smart Research Assistant is a **Chrome Extension** that helps **students, researchers, and writers** by summarizing, saving, and asking questions about online content — using **Gemini AI** and **Spring Boot**.

👉 GitHub Repo: [Smart Research Assistant](https://github.com/Khushi-Saraswat/AskHelp)

---

## ✨ Key Features

### ✅ Summarize Any Text with AI

* Select text on any webpage.
* Click the extension → Get a short, smart summary using **Gemini AI**.

### ✅ Auto Citation Generator

* It extracts:

  * Webpage **Title**
  * Webpage **Link (URL)**
  * **Date Published** (if available)
* Helps in creating quick references for assignments or blogs.

### ✅ Ask Questions About Text

* Select a paragraph → Ask a question like:

  * “What does this mean?”
  * “Why is this important?”
* Gemini AI gives answers.

### ✅ Save Notes (Locally)

* Save your selected or written text.
* Stored using `chrome.storage.local` → stays even after page reload or closing browser.

### ✅ Copy to Clipboard

* Easily copy summaries or notes to use in documents, emails, or anywhere.

---

## 💻 Tech Stack

| Frontend (Extension)  | Backend (Server)   | AI Integration | Browser Features                     |
| --------------------- | ------------------ | -------------- | ------------------------------------ |
| HTML, CSS, JavaScript | Spring Boot (Java) | Gemini AI      | Chrome Extension APIs, Clipboard API |

---

## 🚀 How to Use

### 🔧 1. Clone the Repo

```bash
git clone https://github.com/Khushi-Saraswat/AskHelp
```

### 🔌 2. Load Extension in Chrome

1. Open `chrome://extensions/`
2. Turn on **Developer Mode**
3. Click **Load Unpacked**
4. Select the `extension/` folder from the cloned project

### 🧠 3. Run the Backend Server

```bash
cd backend/
./mvnw spring-boot:run
```

✅ Make sure your `.env` or `application.properties` file has your **Gemini API Key**.

---

## 📚 Who Can Use It?

* Students writing research papers
* Bloggers and writers gathering info
* Developers testing AI-based tools
* Anyone who reads long content and wants help

---


## ⚙️ Built With

* [Gemini API](https://deepmind.google/technologies/gemini/)
* [Spring Boot](https://spring.io/projects/spring-boot)
* [Chrome Extensions](https://developer.chrome.com/docs/extensions/)
* [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

---

## 🙌 Made By

Built with 💙 by **Khushi Saraswat**
Check out: [github.com/Khushi-Saraswat](https://github.com/Khushi-Saraswat)

---


