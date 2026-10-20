import os, re

files = [f for f in os.listdir('.') if f.endswith('.html')]
for f in sorted(files):
    with open(f, 'r', encoding='utf-8') as fp:
        html = fp.read()
    has_bottom_nav = 'bottom-nav' in html
    has_luxe_css = 'luxe.css' in html
    has_app_state = 'app-state.js' in html
    has_cart_js = 'cart.js' in html
    has_app_js = 'app.js' in html
    main_match = re.search(r'<main[^>]*class=["\']([^"\']+)["\']', html)
    main_class = main_match.group(1) if main_match else 'none'
    print(f"{f:22} | main: {main_class:24} | nav: {str(has_bottom_nav):5} | luxe: {str(has_luxe_css):5} | app-state: {str(has_app_state):5}")
