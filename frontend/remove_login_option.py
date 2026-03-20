import os
import glob

html_files = glob.glob(r"c:\Users\iamni\Music\GDG-Team-1\frontend\pages\*.html")

target_string = '                <a href="login.html">Login / Sign Up</a>\n'

count = 0
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Some editors might use different line endings, so let's do a reliable replace
    if "Login / Sign Up</a>" in content:
        import re
        content = re.sub(r'\s*<a href="[^"]*">Login / Sign Up</a>\s*', '\n', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Removed Login/Sign Up from dropdown in {count} HTML files.")
