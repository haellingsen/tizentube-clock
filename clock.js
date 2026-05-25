// TizenTube + Clock overlay
// Loads TizenTube ad-blocking, then adds a persistent clock in top-right corner

(function () {
    // Load TizenTube userScript
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@foxreis/tizentube/dist/userScript.js';
    document.head.appendChild(s);

    // Wait for page to be ready, then inject clock
    function injectClock() {
        if (document.body) {
            var clock = document.createElement('div');
            clock.id = 'tizen-clock-overlay';
            clock.style.cssText = [
                'position:fixed',
                'top:28px',
                'right:36px',
                'z-index:99999',
                'background:rgba(0,0,0,0.55)',
                'color:#fff',
                'font-size:38px',
                'font-family:sans-serif',
                'font-weight:bold',
                'padding:8px 18px',
                'border-radius:10px',
                'letter-spacing:2px',
                'pointer-events:none',
                'user-select:none'
            ].join(';');
            document.body.appendChild(clock);

            function tick() {
                var now = new Date();
                var h = String(now.getHours()).padStart(2, '0');
                var m = String(now.getMinutes()).padStart(2, '0');
                clock.textContent = h + ':' + m;
            }
            tick();
            setInterval(tick, 10000);
        } else {
            setTimeout(injectClock, 500);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectClock);
    } else {
        injectClock();
    }
})();
