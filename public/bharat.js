$(document).ready(function() {
    // Monitor ad image inside the ad container
    function monitorAdImage(retries = 3) {
        const adImage = $('#monetiscopepopupad img'); // Select the image inside the ad div

        // Check if the image exists and bind error event
        if (adImage.length) {
            adImage.on('error', function() {
                if (retries > 0) {
                    console.error('Ad image failed to load. Retrying...');

                    // Retry loading the ad by refreshing the ad slot
                    googletag.cmd.push(function() {
                        googletag.pubads().refresh([googletag.slotManager.getSlotById('monetiscopepopupad')]);
                    });

                    // Retry image monitoring after a delay
                    setTimeout(function() {
                        monitorAdImage(retries - 1);  // Retry with reduced retry count
                    }, 2000);  // Retry after 2 seconds
                } else {
                    console.error('Failed to load ad image after multiple attempts.');
                    adImage.attr('alt', 'Failed to load ad'); // Set an alt text if retries fail
                }
            });
        }
    }

    // Load the Google GPT script and initialize the ad slot
    function loadAdScript(retries = 3) {
        $.getScript('https://securepubads.g.doubleclick.net/tag/js/gpt.js')
            .done(function() {
                window.googletag = window.googletag || { cmd: [] };
                googletag.cmd.push(function() {
                    googletag.defineSlot('/23057650086/MS_Pharma_Pop-up', [[300, 250], [336, 280], [250, 250]], 'monetiscopepopupad')
                              .addService(googletag.pubads());
                    googletag.pubads().set('page_url', 'http://pharmabharat.com');
                    googletag.enableServices();
                });
            })
            .fail(function() {
                if (retries > 0) {
                    console.error('Failed to load GPT script. Retrying...');
                    setTimeout(function() {
                        loadAdScript(retries - 1);  // Retry loading the script
                    }, 3000);  // Retry after 3 seconds
                } else {
                    console.error('Failed to load GPT script after multiple attempts.');
                }
            });
    }

    // Trigger the ad display when the user scrolls 200 pixels down
    $(window).on('scroll', function() {
        if ($(this).scrollTop() >= 200) {
            googletag.cmd.push(function() {
                googletag.display('monetiscopepopupad'); // Display the ad
            });
            $('#monetiscopepopupad').show();  // Show the ad popup

            monitorAdImage();  // Start monitoring the image inside the ad
        }
    });

    // Initialize the ad by loading the GPT script
    loadAdScript();

    // Close button functionality
    $('.close-btn').on('click', function() {
        $('#ad-popup').hide();
        $('#ad-popup').attr('id', 'ad-closed');
    });
});
