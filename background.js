/**
 * Resume Snippet Paster
 * 
 * © 2025 Anand Kumar. All rights reserved.
 * 
 * This software is provided "as is", without warranty of any kind, express or implied,
 * including but not limited to the warranties of merchantability, fitness for a particular purpose,
 * and noninfringement. In no event shall the authors or copyright holders be liable for any claim,
 * damages, or other liability, whether in an action of contract, tort, or otherwise, arising from,
 * out of, or in connection with the software or the use or other dealings in the software.
 * 
 * License: MIT (see LICENSE file for details)
 */

// Update context menu based on stored snippets.
function updateContextMenu() {
  chrome.storage.local.get("snippets", (data) => {
    const snippets = data.snippets || [];
    chrome.contextMenus.removeAll(() => {
      // Create a parent item for our snippets.
      chrome.contextMenus.create({
        id: "parent",
        title: "Paste Resume Snippet",
        contexts: ["editable"]
      });
      // Create a menu item for each snippet.
      snippets.forEach((snippet) => {
        chrome.contextMenus.create({
          id: snippet.id,
          parentId: "parent",
          title: snippet.title ? `${snippet.title} | ${snippet.content.substring(0, 50)}...` : snippet.content.substring(0, 80) + '...',
          contexts: ["editable"]
        });
      });
    });
  });
}

// When the extension is installed, initialize snippets and create the context menu.
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("snippets", (data) => {
    if (!data.snippets) {
      const defaultSnippets = [
        { id: "default1", title: "NVIDIA Professional Summary", content: "Dynamic and results-driven professional with extensive experience in leading projects, driving innovation, and delivering value through technology solutions." },
        { id: "default2", title: "Key Skills", content: "Proficient in JavaScript, HTML, CSS, React, Node.js, and RESTful APIs. Experienced in full-stack development, problem-solving, and agile methodologies." }
      ];
      chrome.storage.local.set({ snippets: defaultSnippets }, updateContextMenu);
    } else {
      updateContextMenu();
    }
  });
});

// Listen for messages (from the popup) to update the context menu.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateContextMenu") {
    updateContextMenu();
  }
});

// Handle context menu clicks.
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "parent") {
    chrome.storage.local.get("snippets", (data) => {
      const snippets = data.snippets || [];
      const snippet = snippets.find(s => s.id === info.menuItemId);
      if (snippet && tab.id) {
        // Inject a script to paste the snippet into the active input field.
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: pasteSnippet,
          args: [snippet.content]
        });
      }
    });
  }
});

// This function runs in the context of the page.
function pasteSnippet(content) {
  const active = document.activeElement;
  if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable)) {
    active.focus();
    // Insert text at the cursor position if possible.
    if (typeof active.selectionStart === 'number') {
      const start = active.selectionStart;
      const end = active.selectionEnd;
      const value = active.value;
      active.value = value.slice(0, start) + content + value.slice(end);
    } else {
      active.value = content;
    }
    // Dispatch an input event to notify any listeners.
    active.dispatchEvent(new Event('input', { bubbles: true }));
  } else {
    // Fallback: copy content to clipboard.
    navigator.clipboard.writeText(content);
    alert("Snippet copied to clipboard!");
  }
}

