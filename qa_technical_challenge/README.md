# QA_technical_challenge
Test Automation, Booking (POST/GET) and Bing Search Verification of VFX (Reason its bing and not google is google would deploy a captcha)

It uses Playwright and JavaScript.

I also had node.js installed.

To run test please run npx playwright test in the terminal.

Part 2 Hiccups

The original task was for me to search VFX on google and check that on the right hand side where the business information is the title Vfx Financial plc is present. 

I tried using google chrome initially, but kept getting hit with a Captcha which i couldn't
bypass.

After emailing you, i was told to use firefox. however since firefox uses google by default 
i ran into the same issues. 

So instead of google i opted for bing to be used on firefox. the issue with bing is the business information was not shown on the right side of the page like google.Because of this, I changed my code to search for the "VFX Financial" title in the main content area (Where all the links are laid out) rather than the right side business information section (as it doesn't exist). I inspected the page manually and found that the title was in an h2 tag, so I updated my code to look for that instead.

I understand that the original task was to check for the business title on the right side of the page, I couldn’t do this using Bing or Yahoo. So, I made the changed to look for the title in a different spot.

If this doesn't meet your expectations, I’m happy to try again.








