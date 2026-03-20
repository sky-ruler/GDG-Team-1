import os

pages_dir = r'c:\Users\iamni\Music\GDG-Team-1\frontend\pages'
for file in os.listdir(pages_dir):
    if file.endswith('.html'):
        path = os.path.join(pages_dir, file)
        with open(path, 'r', encoding='utf-8') as f:
            html = f.read()
        
        # Quick fix for generated invalid escape sequence
        html = html.replace(r"\'sos-center.html\'", "'sos-center.html'")
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
