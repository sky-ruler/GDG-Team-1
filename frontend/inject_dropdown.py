import os
import glob

html_files = glob.glob(r"c:\Users\iamni\Music\GDG-Team-1\frontend\pages\*.html")

dropdown_snippet = '''            <span class="user-name">Welcome back, Nikhil</span>
            <div class="profile-dropdown">
                <a href="login.html">Login / Sign Up</a>
                <a href="login.html">Log Out</a>
            </div>'''

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Append dropdown to user profile if not already there
    if "profile-dropdown" not in content and '<span class="user-name">Welcome back, Nikhil</span>' in content:
        content = content.replace('<span class="user-name">Welcome back, Nikhil</span>', dropdown_snippet)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print(f"Processed dropdown for {len(html_files)} HTML files.")
