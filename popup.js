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

document.addEventListener('DOMContentLoaded', function() {
  loadSnippets();

  document.getElementById('addSnippetForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('snippetTitle').value.trim();
    const content = document.getElementById('snippetContent').value.trim();
    if (title && content) {
      addSnippet(title, content);
      document.getElementById('snippetTitle').value = '';
      document.getElementById('snippetContent').value = '';
    }
  });
});

function loadSnippets() {
  chrome.storage.local.get('snippets', function(data) {
    const snippets = data.snippets || [];
    const snippetList = document.getElementById('snippetList');
    snippetList.innerHTML = '';
    snippets.forEach(snippet => {
      const div = document.createElement('div');
      div.className = 'snippet';
      div.dataset.id = snippet.id;

      const header = document.createElement('div');
      header.className = 'snippet-header';
      header.textContent = snippet.title;
      div.appendChild(header);

      const contentP = document.createElement('p');
      contentP.textContent = snippet.content;
      div.appendChild(contentP);

      // Edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', function() {
        editSnippet(snippet.id);
      });
      div.appendChild(editBtn);

      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', function() {
        deleteSnippet(snippet.id);
      });
      div.appendChild(deleteBtn);

      snippetList.appendChild(div);
    });
  });
}

function addSnippet(title, content) {
  chrome.storage.local.get('snippets', function(data) {
    const snippets = data.snippets || [];
    const id = Date.now().toString(); // simple unique id
    snippets.push({ id, title, content });
    chrome.storage.local.set({ snippets }, function() {
      loadSnippets();
      chrome.runtime.sendMessage({ action: 'updateContextMenu' });
    });
  });
}

function deleteSnippet(id) {
  chrome.storage.local.get('snippets', function(data) {
    let snippets = data.snippets || [];
    snippets = snippets.filter(snippet => snippet.id !== id);
    chrome.storage.local.set({ snippets }, function() {
      loadSnippets();
      chrome.runtime.sendMessage({ action: 'updateContextMenu' });
    });
  });
}

function editSnippet(id) {
  chrome.storage.local.get('snippets', function(data) {
    const snippets = data.snippets || [];
    const snippet = snippets.find(s => s.id === id);
    if (snippet) {
      const newTitle = prompt("Edit Snippet Title:", snippet.title);
      const newContent = prompt("Edit Snippet Content:", snippet.content);
      if (newTitle !== null && newContent !== null) {
        snippet.title = newTitle.trim();
        snippet.content = newContent.trim();
        chrome.storage.local.set({ snippets }, function() {
          loadSnippets();
          chrome.runtime.sendMessage({ action: 'updateContextMenu' });
        });
      }
    }
  });
}

