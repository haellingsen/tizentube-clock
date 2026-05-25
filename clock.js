// TizenTube + Clock overlay
// Fetches TizenTube ad-blocking script via fetch+eval (bypasses CSP),
// then injects a persistent clock in the top-right corner.

(function () {
    // Load TizenTube via fetch+eval to bypass CSP script-src restrictions
    fetch('https://cdn.jsdelivr.net/npm/@foxreis/tizentube/dist/userScript.js')
        .then(function (r) { return r.text(); })
        .then(function (code) { eval(code); })
        .catch(function (e) { console.warn('TizenTube load failed:', e); });

    // Inject clock overlay
    function injectClock() {
        if (!document.body) { setTimeout(injectClock, 300); return; }
        if (document.getElementById('tz-clock')) return;

        var clock = document.createElement('div');
        clock.id = 'tz-clock';
        clock.style.cssText =
            'position:fixed;top:24px;right:32px;z-index:2147483647;' +
            'background:rgba(0,0,0,0.6);color:#fff;' +
            'font-size:36px;font-weight:bold;font-family:sans-serif;' +
            'padding:6px 16px;border-radius:8px;letter-spacing:2px;' +
            'pointer-events:none;';
        document.body.appendChild(clock);

        function tick() {
            var d = new Date();
            clock.textContent =
                String(d.getHours()).padStart(2, '0') + ':' +
                String(d.getMinutes()).padStart(2, '0');
        }
        tick();
        setInterval(tick, 10000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectClock);
    } else {
        injectClock();
    }
})();
