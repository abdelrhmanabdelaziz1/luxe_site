from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    page.goto("http://localhost:8000/index.html")
    
    info = page.evaluate("""() => {
        const html = document.documentElement;
        const body = document.body;
        const app = document.querySelector('.app');
        return {
            windowInnerHeight: window.innerHeight,
            windowScrollY_before: window.scrollY,
            htmlScrollHeight: html.scrollHeight,
            bodyScrollHeight: body.scrollHeight,
            appScrollHeight: app ? app.scrollHeight : null,
            appClientHeight: app ? app.clientHeight : null,
            htmlOverflow: window.getComputedStyle(html).overflow,
            htmlOverflowY: window.getComputedStyle(html).overflowY,
            bodyOverflow: window.getComputedStyle(body).overflow,
            bodyOverflowY: window.getComputedStyle(body).overflowY,
            appOverflow: app ? window.getComputedStyle(app).overflow : null,
            appOverflowY: app ? window.getComputedStyle(app).overflowY : null,
            appHeight: app ? window.getComputedStyle(app).height : null,
            appMaxHeight: app ? window.getComputedStyle(app).maxHeight : null,
            bodyDisplay: window.getComputedStyle(body).display,
            bodyHeight: window.getComputedStyle(body).height
        };
    }""")
    print("PAGE DIAGNOSTIC:", info)
    
    # Try scrolling
    page.evaluate("window.scrollTo(0, 1000)")
    scrollY_after = page.evaluate("window.scrollY")
    print("ScrollY after window.scrollTo(0, 1000):", scrollY_after)
    
    # Try scrolling app
    page.evaluate("document.querySelector('.app').scrollTop = 1000")
    appScrollTop = page.evaluate("document.querySelector('.app').scrollTop")
    print("App scrollTop:", appScrollTop)
    
    browser.close()
