import os
import re

css_path = r"e:\crivela_website\css\style.css"
html_dir = r"e:\crivela_website"

with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Extract all class names from CSS
# Simplistic approach: look for .classname { or .classname, or .classname:
classes = set(re.findall(r'\.([a-zA-Z0-9_\-]+)[ \.,:{>\[]', css_content))

# Exclude pseudo-classes or system classes
exclude = {'active', 'scrolled'}
classes = {c for c in classes if not c.startswith(('ph-', 'hover', 'focus', 'nth', 'before', 'after')) and c not in exclude}

print(f"Found {len(classes)} classes in CSS.")

used_classes = set()
js_content = ""
html_contents = ""

for root, _, files in os.walk(html_dir):
    for file in files:
        if file.endswith('.html'):
            with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
                html_contents += f.read() + "\n"
        elif file.endswith('.js') and file != 'limpar_banco.js':
            with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
                js_content += f.read() + "\n"

# Verify usage
unused_classes = []
for c in classes:
    # Check if exactly this class is in HTML (e.g. class="... c ...")
    # A simple string search for the class name is usually a good heuristic
    # If it's not even a substring in HTML or JS, it's definitely unused.
    if c not in html_contents and c not in js_content:
        unused_classes.append(c)

print(f"Found {len(unused_classes)} potentially unused classes:")
for c in sorted(unused_classes):
    print(c)
