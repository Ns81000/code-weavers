// Configuration
const PROXY_SERVER_URL = 'http://localhost:3001';

// DOM Elements
const noteInput = document.getElementById('noteInput');
const previewCode = document.getElementById('previewCode');
const syntaxSelect = document.getElementById('syntaxSelect');
const expirationSelect = document.getElementById('expirationSelect');
const pasteName = document.getElementById('pasteName');
const privacySelect = document.getElementById('privacySelect');
const saveButton = document.getElementById('saveButton');
const pasteLink = document.getElementById('pasteLink');
const copyButton = document.getElementById('copyButton');
const helpButton = document.getElementById('helpButton');
const helpModal = document.getElementById('helpModal');
const closeHelp = document.getElementById('closeHelp');

// Initialize highlight.js
hljs.configure({
    ignoreUnescapedHTML: true
});

// Update preview when input changes
function updatePreview() {
    const content = noteInput.value;
    const language = syntaxSelect.value;
    
    previewCode.textContent = content;
    previewCode.className = `language-${language}`;
    hljs.highlightElement(previewCode);
}

// Event Listeners
noteInput.addEventListener('input', updatePreview);
syntaxSelect.addEventListener('change', updatePreview);

// Help modal logic
helpButton.addEventListener('click', () => {
    helpModal.style.display = 'flex';
    helpModal.focus();
});
closeHelp.addEventListener('click', () => {
    helpModal.style.display = 'none';
});
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && helpModal.style.display === 'flex') {
        helpModal.style.display = 'none';
    }
});

// Toast notification logic
function showToast(message, isError = false) {
    let toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '2rem';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = isError ? '#d9534f' : '#4a9eff';
    toast.style.color = '#fff';
    toast.style.padding = '1rem 2rem';
    toast.style.borderRadius = '4px';
    toast.style.zIndex = 2000;
    toast.style.fontSize = '1rem';
    toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
}

// Loading indicator logic
function setLoading(isLoading) {
    if (isLoading) {
        saveButton.disabled = true;
        saveButton.textContent = 'Saving...';
        saveButton.classList.add('loading');
    } else {
        saveButton.disabled = false;
        saveButton.textContent = 'Save Note';
        saveButton.classList.remove('loading');
    }
}

// Tab support in textarea
noteInput.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '\t' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
        updatePreview();
    }
});

// Save note to Pastebin
async function saveNote() {
    const content = noteInput.value.trim();
    if (!content) {
        showToast('Please enter some content before saving.', true);
        return;
    }

    const noteData = {
        api_option: 'paste',
        api_paste_code: content,
        api_paste_expire_date: expirationSelect.value,
        api_paste_format: syntaxSelect.value,
        api_paste_name: pasteName.value || 'QuickCache Note',
        api_paste_private: privacySelect.value
    };

    try {
        setLoading(true);
        const response = await fetch(`${PROXY_SERVER_URL}/create-paste`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteData)
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        pasteLink.value = data.url;
        copyButton.disabled = false;
        showToast('Note saved successfully!');
    } catch (error) {
        showToast(`Error saving note: ${error.message}`, true);
    } finally {
        setLoading(false);
    }
}

// Copy link and handle "vanish" functionality
function copyLinkAndVanish() {
    const link = pasteLink.value;
    if (!link) {
        showToast('No paste link available to copy.', true);
        return;
    }

    navigator.clipboard.writeText(link).then(() => {
        // Check if the paste is set to never expire
        if (expirationSelect.value === 'N') {
            showToast('Note is set to never expire. Consider setting an expiration for temporary notes.');
        } else {
            showToast('Link copied to clipboard!');
        }

        // Clear the form
        noteInput.value = '';
        pasteName.value = '';
        pasteLink.value = '';
        copyButton.disabled = true;
        updatePreview();
    }).catch(err => {
        showToast('Failed to copy link: ' + err.message, true);
    });
}

// Event Listeners
saveButton.addEventListener('click', saveNote);
copyButton.addEventListener('click', copyLinkAndVanish);

// Initialize
copyButton.disabled = true;
updatePreview(); 