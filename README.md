
# 🔍 Smart Research Assistant (Chrome Extension)

Smart Research Assistant is a productivity-focused Chrome Extension designed to **help researchers, students, and writers summarize, cite, question, and save content** they find online — all in one seamless tool.

It intelligently combines the power of **Spring Boot**, **Gemini AI**, **Chrome Extension APIs**, and modern **web technologies** like HTML, CSS, and JavaScript to create an AI-enhanced research experience.

---

## 🚀 Features

### ✅ 1. AI-Powered Text Summarization
- Select any text on a webpage → Get a **concise summary** instantly using Gemini API.
- Designed for quick understanding of large content blocks.

### ✅ 2. Citation Extraction
- Automatically extracts:
  - 📄 **Title** of the web page
  - 🔗 **URL**
  - 🗓️ **Publication Date** (if available)
- Generates citation info for academic/reference use.

### ✅ 3. Ask Questions About Text (Using Gemini)
- After selecting any text, ask **follow-up questions**.
- Example: Select a paragraph → Ask “What does this mean?” → Gemini provides an explanation.

### ✅ 4. Save Notes Locally
- Copy-pasted or selected text can be saved in a **local textarea** using **`chrome.storage.local`**.
- Data persists even after browser refresh or tab close.

### ✅ 5. Clipboard Copy Functionality
- Any summarized or saved text can be **copied to clipboard** using the **Clipboard API**.
- Makes it easy to transfer insights to documents, blogs, or note apps.

---

## 🛠️ Tech Stack

| Frontend  | Backend     | AI Integration | Browser APIs      |
|-----------|-------------|----------------|--------------------|
| HTML/CSS  | Spring Boot | Gemini AI API  | Chrome Extension APIs |
| JavaScript | Java       |                | Clipboard API       |

---


## 📦 Installation & Usage

### 1. Clone the Repository

```bash
git clone https://github.com/Khushi-Saraswat/smart-research-assistant.git
````

### 2. Load Chrome Extension

1. Go to `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load Unpacked**
4. Select the `extension/` directory inside the repo

### 3. Run Spring Boot Backend

```bash
cd backend/
./mvnw spring-boot:run
```

Make sure your Gemini API key is set up in your backend config.

---

## 📌 Use Cases

* 📚 Students summarizing research papers
* ✍️ Writers collecting references
* 🧠 Bloggers drafting quick content insights
* 🧪 Developers testing with AI summarization tools

---

## 📸 Demo
<img width="1832" height="781" alt="ask" src="https://github.com/user-attachments/assets/39d02886-63ab-4bf4-a68d-3174290d019b" />
<img width="1896" height="863" alt="image" src="https://github.com/user-attachments/assets/978c13d8-2ab4-48e9-a00a-04a95c95c454" />
<img width="649" height="784" alt="image" src="https://github.com/user-attachments/assets/19b42175-abad-4ee3-adbd-0d27257a21d7" />




---

## 🤖 Powered By

* [Gemini API](https://deepmind.google/technologies/gemini/)
* [Spring Boot](https://spring.io/projects/spring-boot)
* [Chrome Extension API](https://developer.chrome.com/docs/extensions/)
* [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

---

## 🙌 Acknowledgements

Built with 💙 by **Khushi Saraswat** as part of a personal AI productivity project.

---


---

## 💡 Future Enhancements

* Login functionality with JWT
* Save to cloud (Firebase or MongoDB)
* Add PDF export
* Dark Mode UI

```

---
```
