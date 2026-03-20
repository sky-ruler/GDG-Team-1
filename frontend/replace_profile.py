import os
import glob

html_files = glob.glob(r"c:\Users\iamni\Music\GDG-Team-1\frontend\pages\*.html")

link_tag = '    <link rel="stylesheet" href="../css/nav_profile.css">\n</head>'

profile_snippet = '''        <div class="user-profile">
            <img src="../resources/nikhil.jpg" alt="User Profile" class="profile-pic">
            <span class="user-name">Welcome back, Nikhil</span>
        </div>
    </header>'''

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add the CSS link if not present
    if "nav_profile.css" not in content:
        content = content.replace("</head>", link_tag)

    # Replace the login button if present
    # There are variations of the login button, but standard is:
    # <button class="loginbtn">Login / Sign Up</button>
    import re
    # We will look for header closing tag to anchor this nicely or just replace the button.
    # Pattern: <button class="loginbtn">Login / Sign Up</button>\s*</header>
    pattern = re.compile(r'<button class="loginbtn"\s*>Login / Sign Up</button>\s*</header>', re.IGNORECASE)
    if pattern.search(content):
        content = pattern.sub(profile_snippet, content)
    else:
        # Check without header anchor just in case
        pattern2 = re.compile(r'<button class="loginbtn"\s*>Login / Sign Up</button>', re.IGNORECASE)
        content = pattern2.sub('''        <div class="user-profile">
            <img src="../resources/nikhil.jpg" alt="User Profile" class="profile-pic">
            <span class="user-name">Welcome back, Nikhil</span>
        </div>''', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Processed {len(html_files)} HTML files.")
