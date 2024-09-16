(function () {
    'use strict';

    // Utility functions
    const h = {
        getConstructor: function (B) {
            return B != null ? B.constructor : null;
        },
        instanceOf: function (B, x) {
            return Boolean(B && x && B instanceof x);
        },
        nullOrUndefined: function (B) {
            return B == null;
        },
        boolean: function (B) {
            return this.getConstructor(B) === Boolean;
        },
        string: function (B) {
            return this.getConstructor(B) === String;
        },
        number: function (B) {
            return this.getConstructor(B) === Number && !Number.isNaN(B);
        },
        object: function (B) {
            return this.getConstructor(B) === Object;
        },
        fn: function (B) {
            return typeof B === 'function';
        },
        array: function (B) {
            return Array.isArray(B);
        },
        nodeList: function (B) {
            return this.instanceOf(B, NodeList);
        },
        empty: function (B) {
            return this.nullOrUndefined(B) ||
                ((this.string(B) || this.array(B) || this.nodeList(B)) && !B.length) ||
                (this.object(B) && !Object.keys(B).length);
        }
    };

    // Asynchronous function to fetch JSON data from a URL
    async function A(B, x = {}) {
        if (typeof B !== 'string' || !B) throw new Error('URL must be a valid string.');

        const u = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            ...x
        };

        try {
            const S = await fetch(B, u);
            if (!S.ok) throw new Error('HTTP error! status: ' + S.status);
            return await S.json();
        } catch (U) {
            console.error('Error fetching JSON:', U);
            throw U;
        }
    }

    // Function to extract the hostname from the current window's location
    function v() {
        const B = (window !== window.top ? window.top : window).location.hostname.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^\/\n?]+)$/i);
        return (B && B[1]).replace(/\./g, '_') || null;
    }

    // Class to handle Google Ad display
    class AdHandler {
        constructor(B, x = null) {
            this.config = B;
            this.adSizeCategory = x;
            this.scriptLoaded = false;
            this.adSlot = null;
            this.state = {};
            this.document = window.top.document;

            this.loadScript().then(() => {
                this.googletag = window.top.googletag;
                this.triggerReady();
                this.attachEventListeners();
            });
        }

        loadScript() {
            const B = window.top.document;
            return new Promise(x => {
                const u = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
                if (B.querySelector(script[src = "${u}"])) {
                    x();
                } else {
                    const S = B.createElement('script');
                    S.src = u;
                    S.async = true;
                    S.onload = () => {
                        x();
                    };
                    B.head.appendChild(S);
                }
            });
        }

        defineSlot() {
            const B = this.googletag.sizeMapping();
            if (this.adSizeCategory) {
                const u = this.defaults.adSizeMapping[this.adSizeCategory];
                B.addSize(u.viewportSize, u.slotSize);
            } else {
                for (const S in this.defaults.adSizeMapping) {
                    if (this.defaults.adSizeMapping.hasOwnProperty(S)) {
                        const U = this.defaults.adSizeMapping[S];
                        B.addSize(U.viewportSize, U.slotSize);
                    }
                }
            }
            const x = B.build();
            return this.googletag.defineSlot(this.config.adUnit[0].id, this.config.adUnit[0].size, this.config.adPlacementId).defineSizeMapping(x);
        }

        defineAndDisplaySlot() {
            if (!this.adSlot) {
                this.googletag.cmd.push(() => {
                    this.adSlot = this.defineSlot();
                    this.adSlot.addService(this.googletag.pubads());
                    this.googletag.enableServices();
                    this.googletag.display(this.adSlot);
                    this.state.lastRenderedAttempt = Math.floor(new Date().getTime() / 1000);
                });
            }
        }

        onAdLoaded(B) {
            if (typeof B === 'function') {
                this.adLoadedCallback = B;
            } else {
                console.warn('onAdLoaded expects a function');
            }
        }

        attachEventListeners() {
            this.googletag.cmd.push(() => {
                this.googletag.pubads().addEventListener('slotRenderEnded', B => {
                    if (B.slot === this.adSlot && !B.isEmpty && this.adLoadedCallback && typeof this.adLoadedCallback === 'function') {
                        this.adLoadedCallback();
                    }
                });
            });
        }
    }

    // Class to manage the modal ad
    class ModalAd {
        constructor(B) {
            this.config = B;
            this.modal = null;
            this.bannerAdHandler = new AdHandler(B);

            this.init();
        }

        init() {
            this.createModal();
            this.bannerAdHandler.onAdLoaded(() => {
                this.modal.style.display = 'flex';
            });
        }

        createModal() {
            this.setupStyles();
            this.modal = document.createElement('div');
            this.modal.id = 'jb-popup-ad-modal';
            this.modal.onclick = U => {
                if (U.target === this.modal) {
                    setTimeout(() => {
                        this.closeModal();
                    }, 2000);
                }
            };
            const B = document.createElement('div');
            B.id = 'jb-popup-ad-modal-content';
            const x = document.createElement('div');
            x.id = 'jb-popup-ad-modal-header';
            const u = document.createElement('div');
            u.id = this.config.adPlacementId;
            const S = document.createElement('button');
            S.id = 'jb-popup-ad-close-btn';
            S.onclick = () => this.closeModal();
            S.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z"/></svg>';
            x.appendChild(S);
            B.appendChild(x);
            B.appendChild(u);
            this.modal.appendChild(B);
            document.body.appendChild(this.modal);
        }

        setupStyles() {
            const styleContent = `
                #jb-popup-ad-modal {
                    display: none;
                    justify-content: center;
                    align-items: center;
                    position: fixed;
                    left: 50%;
                    top: 50%;
                    width: 100%;
                    height: 100%;
                    transform: translate(-50%, -50%);
                    z-index: 1000;
                    background-color: rgba(0, 0, 0, 0.5);
                }

                #jb-popup-ad-modal-content {
                    width: auto;
                    height: auto;
                    background-color: white;
                    outline: 1px solid black;
                    padding: 5px;
                }

                #jb-popup-ad-modal-header {
                    position: relative;
                    height: 30px;
                }

                #jb-popup-ad-close-btn {
                    all: initial;
                    position: absolute;
                    left: 0;
                    border: none;
                    appearance: none;
                    background: none;
                    cursor: pointer;
                }
            `;
            const style = document.createElement('style');
            style.type = 'text/css';
            style.appendChild(document.createTextNode(styleContent));
            document.head.appendChild(style);
        }

        closeModal() {
            this.modal.style.display = 'none';
        }
    }

    // Main function to initialize everything
    (async function () {
        try {
            await function (x, u = document) {
                return new Promise((S, U) => {
                    const script = u.createElement('script');
                    script.type = 'text/javascript';
                    script.src = x.src;
                    script.async = !!x.async;
                    script.defer = !!x.defer;
                    script.onload = () => {
                        S();
                    };
                    u.head.appendChild(script);
                });
            }({ src: 'https://securepubads.g.doubleclick.net/tag/js/gpt.js', async: true });

            let config;
            const hostname = v(); // Get the current website's hostname
            const url = https://jbmcm.blob.core.windows.net/publishers/${hostname}/popup-ad.json;

            try {
                config = await A(url);
            } catch (err) {
                console.error('Failed to load ad config from hostname-based URL:', err);
                config = await A('https://fallback-url/popup-ad.json'); // Fallback URL if the primary fails
            }

            // Initialize ModalAd with fetched config
            if (config) {
                const modalAd = new ModalAd(config);
            }
        } catch (err) {
            console.error('Error in initializing ad:', err);
        }
    })();
})();