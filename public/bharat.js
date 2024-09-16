(function () {
    // Create and insert style element using jQuery
    const $style = $('<style>', { id: 'style' }).html(`
        @media(max-width:459px) {
            .fixed-width {
                width: 100%;
            }
            #close-popup {
                min-width: 100%;
                padding: 0px 10px;
            }
        }
        .fixed-width {
            width: 300px;
            height: 600px;
            display: none;
            background-color: #ffffff;
            border-radius: 4px;
            padding: 10px;
        }
        #close-popup {
            width: 100%;
            min-width: 270px;
            height: 40px;
            padding: 10px 0px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            color: gray;
            font-family: helvetica, sans-serif;
            border: solid #9a9a9a 0px;
            border-width: 0px 0px 1px 0px;
        }
        #monetiscopepopupad {
            padding: 10px 8px 10px 8px;
            box-shadow: 0px 10px 20px 0px rgba(128, 128, 128, 0.645);
            border-radius: 2px;
            overflow: hidden;
        }
        .ourPowerOf {
            color: red;
            cursor: pointer;
        }
        .close-btn {
            width: 20px;
            height: 20px;
            background-color: #9a9a9a;
            color: #fff;
            border-radius: 2px;
            border: 1px solid #b1b1b1;
            text-align: center;
            cursor: pointer;
        }
    `);
    $('head').append($style);

    // Create ad popup HTML structure using jQuery
    const $adPopup = $('<div>', { id: 'ad-popup' });
    const $fixedWidthDiv = $('<div>', { class: 'fixed-width' });
    const $closePopupDiv = $('<div>', { id: 'close-popup' });
    const $ourPowerOfSpan = $('<span>', { class: 'ourPowerOf' }).html("Powered By <span style='color: #206cd7;'>Monetiscope</span>");
    const $closePopupCross = $('<span>', { class: 'close-btn', text: 'x' });

    $closePopupDiv.append($ourPowerOfSpan, $closePopupCross);
    const $monetiscopePopupAd = $('<div>', { id: 'monetiscopepopupad' });
    $fixedWidthDiv.append($closePopupDiv, $monetiscopePopupAd);
    $adPopup.append($fixedWidthDiv);
    $('body').append($adPopup);

    // Handle click on Powered By Monetiscope
    $ourPowerOfSpan.on('click', function () {
        window.location.href = "https://monetiscope.com";
    });

    // Handle close button click
    $closePopupCross.on('click', function () {
        $adPopup.hide().attr('id', 'ad-closed');
    });

    // Load Google GPT script with retries
    function loadAdScript(retries = 3) {
        const gptScript = $('<script>', {
            src: 'https://securepubads.g.doubleclick.net/tag/js/gpt.js',
            async: true
        });

        gptScript.on('load', function () {
            window.googletag = window.googletag || { cmd: [] };
            googletag.cmd.push(function () {
                googletag.defineSlot('/23057650086/MS_Pharma_Pop-up', [[300, 250], [336, 280], [250, 250]], 'monetiscopepopupad').addService(googletag.pubads());
                googletag.pubads().set('page_url', 'http://pharmabharat.com');
                googletag.enableServices();
            });
        });

        gptScript.on('error', function () {
            if (retries > 0) {
                console.error('Failed to load Google GPT script. Retrying...');
                setTimeout(() => loadAdScript(retries - 1), 3000); // Retry after 3 seconds
            } else {
                console.error('Failed to load Google GPT script after multiple attempts.');
                $adPopup.hide().attr('id', 'ad-closed');
            }
        });

        $('head').append(gptScript);
    }

    loadAdScript(); // Initial load

    // Monitor ad container for image load errors
    function monitorAdImage(retries = 3) {
        const adImages = $monetiscopePopupAd.find('img'); // Find all images in the ad container

        adImages.each(function () {
            $(this).on('error', function () {
                if (retries > 0) {
                    console.error('Ad image failed to load. Retrying...');
                    googletag.pubads().refresh([googletag.slotManager.getSlotById('monetiscopepopupad')]);
                    setTimeout(() => monitorAdImage(retries - 1), 2000); // Retry after 2 seconds
                } else {
                    console.error('Failed to load ad image after multiple attempts.');
                    $(this).attr('alt', 'Failed to load ad');
                }
            });
        });
    }

    // Show ad on scroll
    function showAd() {
        if ($(window).scrollTop() >= 200) {
            if (window.googletag) {
                googletag.cmd.push(function () {
                    googletag.display('monetiscopepopupad');
                });
                $fixedWidthDiv.show();
                $adPopup.css({
                    width: '100%',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#0000008f',
                    boxSizing: 'border-box',
                    zIndex: 9999999999
                });
                monitorAdImage(); // Start monitoring the images in the ad
            }
        }
    }

    $(window).on('scroll', showAd);
})();
