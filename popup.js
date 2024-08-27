document.getElementById('generateWireframe').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        const url = activeTab.url;

        // Check if the URL is not a chrome:// or about:// URL
        if (url.startsWith('chrome://') || url.startsWith('about://')) {
            alert('This extension cannot be used on chrome:// or about:// pages.');
            return; // Stop execution if on an unsupported URL
        }

        // If the URL is valid, inject the wireframe drawing script
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: () => {
                function drawWireframe() {
                    const elements = document.querySelectorAll('div, header, footer, aside, main, section, article, nav');
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    canvas.width = document.body.scrollWidth;
                    canvas.height = document.body.scrollHeight;
                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = 2;

                    elements.forEach(el => {
                        const rect = el.getBoundingClientRect();
                        ctx.strokeRect(rect.left, rect.top, rect.width, rect.height);
                        ctx.font = '12px Arial';
                        ctx.fillText(el.tagName.toLowerCase(), rect.left + 5, rect.top + 15);
                    });

                    const link = document.createElement('a');
                    link.download = 'wireframe.png';
                    link.href = canvas.toDataURL();
                    link.click();
                }

                drawWireframe();
            }
        });
    });
});
