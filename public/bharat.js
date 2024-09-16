(function () {
    // Create and insert style element
    const style = document.createElement('style');
    style.id = 'style';
    style.innerHTML = `
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
            min-width: 300px; /* Set width to 300px */
           min-height: 250px; /* Adjust height to 250px to match typical ad sizes */
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
    `;
    document.head.appendChild(style);

    // Create ad popup HTML structure
    const adPopup = document.createElement('div');
    adPopup.id = 'ad-popup';

    const fixedWidthDiv = document.createElement('div');
    fixedWidthDiv.className = 'fixed-width';

    const closePopupDiv = document.createElement('div');
    closePopupDiv.id = 'close-popup';

    const ourPowerOfSpan = document.createElement('span');
    ourPowerOfSpan.className = 'ourPowerOf';
    ourPowerOfSpan.innerHTML = "Powered By <span style='color: #206cd7;'>Monetiscope</span>";
    ourPowerOfSpan.querySelector("span").addEventListener("click", function () {
        window.location.href = "https://monetiscope.com";
    });

    const closePopupCross = document.createElement('span');
    closePopupCross.className = 'close-btn';
    closePopupCross.textContent = 'x'; // Set the text content to 'x'

    closePopupDiv.appendChild(ourPowerOfSpan);
    closePopupDiv.appendChild(closePopupCross);

    const monetiscopePopupAd = document.createElement('div');
    monetiscopePopupAd.id = 'monetiscopepopupad';

    fixedWidthDiv.appendChild(closePopupDiv);
    fixedWidthDiv.appendChild(monetiscopePopupAd);

    adPopup.appendChild(fixedWidthDiv);
    document.body.appendChild(adPopup);

    // Load Google GPT script
    const gptScript = document.createElement('script');
    gptScript.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
    gptScript.async = true;
    document.head.appendChild(gptScript);

    gptScript.onload = function () {
        window.googletag = window.googletag || { cmd: [] };
        googletag.cmd.push(function () {
            googletag.defineSlot('/23157923394/MS_Recruite_POP-UP', [[300, 250], [336, 280], [250, 250]], 'monetiscopepopupad').addService(googletag.pubads());
            googletag.pubads().set('page_url', 'http://recruitind.com');
            googletag.enableServices();
            googletag.display('monetiscopepopupad');
        });
    };

    gptScript.onerror = function () {
        console.error('Failed to load Google GPT script.');
    };

    // Show the ad when the user scrolls 200 pixels
    function showAd() {
        if (window.scrollY >= 200) {
            fixedWidthDiv.style.display = "block";
            adPopup.style.cssText = `
                width: 100%;
                height: 100vh;
                position: fixed;
                top: 0;
                left: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: rgba(0, 0, 0, 0.56);
                box-sizing: border-box;
                z-index: 9999999999;
            `;
            window.removeEventListener('scroll', showAd); // Remove the scroll event listener after the ad is shown
        }
    }

    window.addEventListener('scroll', showAd);

    // Close button functionality
    closePopupCross.addEventListener('click', function () {
        adPopup.style.display = 'none';
        adPopup.setAttribute('id', 'ad-closed');
    });
})();
