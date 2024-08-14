(function () {
    // Check if the ad has been shown in the current session
    // if (sessionStorage.getItem('adShown') === 'true') return;

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
            min-width: 316px;
            min-height: 350px;
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
    closePopupCross.id = 'close-popup-cross';
    closePopupCross.className = 'fa-solid fa-x fa-rotate-180 fa-xl';
    closePopupCross.style.color = "#121211 "
    closePopupCross.style.fontSize="200%";
    closePopupCross.style.cursor = "pointer"; // Opt
    closePopupCross.textContent = 'X'; // 

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
            // /22824118996/MS_techinsyders_Pop-up
            googletag.defineSlot('/23143462395/Test_300x250', [[300, 250], [336, 280], [250, 250]], 'monetiscopepopupad').addService(googletag.pubads());
           
            googletag.pubads().set('page_url', 'https://aictecareerportal.com/');
            googletag.enableServices();
        });
    };

    gptScript.onerror = function () {
        console.error('Failed to load Google GPT script.');
    };

    // Show the ad after 3 seconds
    setTimeout(function () {
        if (window.googletag) {
            googletag.cmd.push(function () {
                googletag.display('monetiscopepopupad');
            });
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
                background-color: #0000008f;
                box-sizing: border-box;
                z-index: 9999999999;
            `;
            // sessionStorage.setItem('adShown', 'true'); // Mark the ad as shown
        } else {
            console.log("Google GPT is not available.");
            adPopup.style.display = "none";
            adPopup.setAttribute("id", "ad-closed");
        }
    }, 3000); // 3 seconds delay

    // Close button functionality
    closePopupCross.addEventListener('click', function () {
        adPopup.style.display = 'none';
        adPopup.setAttribute('id', 'ad-closed');
    });
})();
