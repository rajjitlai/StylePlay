// DOM Elements
const editor = document.getElementById('live-css');
const snippetSelect = document.getElementById('snippet-select');
const copyBtn = document.getElementById('copy-btn');
const resetBtn = document.getElementById('reset-btn');

// Initial Code Backup
let initialCode = editor.textContent.trim();
// Update initialCode when page loads completely to ensure styles are caught? 
// No, the style tag content is static HTML.

// Snippet Library
const snippets = {
    neon: `body {
  background: #09090b;
}

.preview-box {
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00;
  box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00;
  transition: all 0.3s ease-in-out;
}

.box-1 { border-color: #ff00ff; color: #ff00ff; text-shadow: 0 0 10px #ff00ff; box-shadow: 0 0 10px #ff00ff; }
.box-2 { border-color: #00ffff; color: #00ffff; text-shadow: 0 0 10px #00ffff; box-shadow: 0 0 10px #00ffff; }
.box-3 { border-color: #ffff00; color: #ffff00; text-shadow: 0 0 10px #ffff00; box-shadow: 0 0 10px #ffff00; }
.box-4 { border-color: #ff0000; color: #ff0000; text-shadow: 0 0 10px #ff0000; box-shadow: 0 0 10px #ff0000; }`,

    glass: `.preview-box {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 16px;
  color: white;
}

.box-1 { background: rgba(255, 99, 132, 0.25); }
.box-2 { background: rgba(54, 162, 235, 0.25); }
.box-3 { background: rgba(255, 206, 86, 0.25); }
.box-4 { background: rgba(75, 192, 192, 0.25); }`,

    grid: `.playground-container {
    grid-template-columns: 1fr;
}

.preview-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.preview-box {
  border-radius: 4px;
  color: #1e293b;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.box-1 { background: #cbd5e1; grid-column: span 2; }
.box-2 { background: #94a3b8; }
.box-3 { background: #64748b; }
.box-4 { background: #475569; grid-column: span 2; }`,

    bounce: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.preview-box {
  animation: bounce 2s infinite ease-in-out;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  color: #fff;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.box-2 { animation-delay: 0.2s; background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%); }
.box-3 { animation-delay: 0.4s; background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%); }
.box-4 { animation-delay: 0.6s; background: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%); }`
};

// Event Listeners

// Snippet Loader
snippetSelect.addEventListener('change', (e) => {
    const selectedSnippet = e.target.value;
    if (snippets[selectedSnippet]) {
        editor.innerText = snippets[selectedSnippet];
        // Trigger generic input event if we added listener for that, but contenteditable styling updates automatically
    }
});

// Copy to Clipboard
copyBtn.addEventListener('click', () => {
    const code = editor.innerText;
    navigator.clipboard.writeText(code).then(() => {
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa fa-check" style="color: #4ade80;"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
        }, 2000);
    });
});

// Reset Code
resetBtn.addEventListener('click', () => {
    if (confirm('Reset to default styles? All changes will be lost.')) {
        editor.innerText = initialCode;
        snippetSelect.value = "";
    }
});

// Title Change Logic
let docTitle = document.title;
window.addEventListener("blur", () => {
    document.title = "💔 Come back to StylePlay!";
})
window.addEventListener("focus", () => {
    document.title = docTitle;
})

// Tab Support in Editor
editor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        document.execCommand('insertText', false, '  ');
    }
});

// Device Toggle
const deviceBtns = document.querySelectorAll('.device-btn');
const previewContainer = document.getElementById('preview-container');

deviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        deviceBtns.forEach(b => {
            b.classList.remove('active');
            b.querySelector('i').style.color = ''; // Reset icon color
        });

        // Add active to current
        btn.classList.add('active');

        // Update Container Class
        const device = btn.dataset.device;
        previewContainer.className = 'preview-content'; // Reset
        if (device !== 'desktop') {
            previewContainer.classList.add(device);
        }
    });
});
