chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            function drawWireframe() {
                // Same drawWireframe function code as above
                const elements = document.querySelectorAll('div, header, footer, aside, main, section, article, nav');
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Set canvas dimensions
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
