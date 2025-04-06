# Resume Snippet Paster

## Overview
The Resume Snippet Paster is a Chrome extension designed to help users quickly paste resume snippets into any text input field on any website.  If you've ever applied to multiple jobs on a platform that looks standardized but still requires you to enter your resume details separately for each company, you know the frustration.  Whether you’re applying to dozens of roles or just a few, this extension saves you time by giving you quick access to your resume text with just a right-click.

### Features
- Right-click to access a customizable list of resume snippets.
- Display snippet titles when right-clicking, along with a shortened preview of the snippet.
- Add, edit, and delete snippets directly from the extension popup.
- Snippets are saved locally and are automatically updated in the context menu.
- Secure clipboard integration to paste snippets into focused input fields.

## Installation Instructions
1. Download the latest version from the [Releases](https://github.com/akumarlabs/resume_snippet_paster/releases) page.
2. Extract the ZIP file to a location of your choice.
3. Go to `chrome://extensions/` in your Chrome browser.
4. Enable **Developer mode** (toggle in the top right corner).
5. Click **Load unpacked** and select the extracted project folder.
6. The extension will appear in your browser toolbar.

## Usage Instructions
1. Right-click on any text input field.
2. Choose **"Paste Resume Snippet"** from the context menu.
3. Select the snippet you want to paste.
4. To add or edit snippets, click the extension icon and use the popup interface.

## Folder Structure
```
resume_paste_extension/  
├── manifest.json       # Extension configuration  
├── background.js       # Manages context menu and pasting  
├── popup.js            # Handles adding and deleting snippets  
├── popup.html          # Popup UI  
├── icons/              # Extension icons  
└── README.md           # Project documentation  
```

## Security Considerations
- **Clipboard Access:** Uses `navigator.clipboard.writeText` to securely handle clipboard operations.
- **Context Menu Management:** Dynamically updates based on stored snippets.
- **Input Validation:** Properly sanitizes user inputs to prevent script injection.
- **Browser Permissions:** Uses only necessary permissions to minimize risks.

## Future Enhancements
- Cloud Sync: Store snippets in the cloud for cross-device availability.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License.

## Disclaimer
This extension is provided "as is" without any guarantees or warranty. Use at your own risk.  
It has not been thoroughly tested and is primarily being released to address a specific, immediate use case.  
While efforts have been made to ensure basic functionality, unexpected behavior may occur.  
Please consider this before using it in any critical or professional setting. 

© 2025 Anand Kumar. All rights reserved.