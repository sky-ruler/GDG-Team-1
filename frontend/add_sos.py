import os
import re

css_content = """/* Floating SOS Common Style */
.floating_sos {
    position: fixed;
    top: 90px;
    right: 30px;
    background: #E53935;
    color: white;
    border: none;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    z-index: 1000;
}
"""

with open(r'c:\Users\iamni\Music\GDG-Team-1\frontend\css\floating_sos.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

# Remove floating_sos from dashboard.css
dash_css_path = r'c:\Users\iamni\Music\GDG-Team-1\frontend\css\dashboard.css'
with open(dash_css_path, 'r', encoding='utf-8') as f:
    d_css = f.read()
# Regex to match the block with flexible spacing
d_css = re.sub(r'/\*Floating SOS\*/[\s\S]*?\.floating_sos\s*\{[\s\S]*?\}', '', d_css)
with open(dash_css_path, 'w', encoding='utf-8') as f:
    f.write(d_css.strip() + '\n')

# Process all HTML files
pages_dir = r'c:\Users\iamni\Music\GDG-Team-1\frontend\pages'
for file in os.listdir(pages_dir):
    if file.endswith('.html'):
        path = os.path.join(pages_dir, file)
        with open(path, 'r', encoding='utf-8') as f:
            html = f.read()

        # Add CSS link
        if 'floating_sos.css' not in html:
            html = html.replace('</head>', '    <link rel="stylesheet" href="../css/floating_sos.css">\n</head>')

        # Add or update button
        if 'class="floating_sos"' not in html:
            btn_html = '    <button class="floating_sos" onclick="window.location.href=\'sos-center.html\'">SOS</button>\n</body>'
            html = html.replace('</body>', btn_html)
        else:
            # Update existing button to include onclick
            html = re.sub(r'<button class="floating_sos"[^>]*>SOS</button>', 
                          r'<button class="floating_sos" onclick="window.location.href=\'sos-center.html\'">SOS</button>', html)

        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
