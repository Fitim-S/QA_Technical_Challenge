const { test, expect } = require("@playwright/test");

test("Create and Retrieve Booking API Test", async ({ request }) => {
  // Create the booking data
  const bookingData = {
    firstname: "Fitim",
    lastname: "",
    totalprice: 1550,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01"
    },
    additionalneeds: "extra needs"
  };

  // Send a request to create a new booking by POST
  const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: bookingData
  });

  // Verify status is 200 / 201
  const responseStatus = createResponse.status();
  console.log('Create Booking Response Status:', responseStatus);
  expect(responseStatus).toBe(200); // or .toBe(201)

  // Get the booking ID from the response
  const createResponseBody = await createResponse.json();
  const bookingId = createResponseBody.bookingid;
  console.log('Created Booking ID:', bookingId);

  // Get the booking details using the booking ID
  const getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
  
  // Convert the response to JSON
  const getResponseBody = await getResponse.json();
  
  console.log("Retrieved Booking Details:", getResponseBody);
  console.log("First Name from GET:", getResponseBody.firstname);
  
  // Verify that the first name matches the original booking data
  expect(getResponseBody.firstname).toBe(bookingData.firstname);
});


test('Search for VFX Financial on Firefox', async ({ browser }) => {
  // Open Firefox
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to Bing
  await page.goto('https://www.bing.com');

  // Accept cookies
  await page.waitForSelector('button:has-text("Accept")');
  await page.click('button:has-text("Accept")');
  
  // Wait for page to fully load after clicking Accept
  await page.waitForTimeout(1000);
  
  // Search for VFX Financial
  const searchBoxSelector = '#sb_form_q';
  await page.waitForSelector(searchBoxSelector, { state: 'visible' });
  await page.click(searchBoxSelector);
  await page.fill(searchBoxSelector, '');
  await page.fill(searchBoxSelector, 'VFX Financial');
  await page.keyboard.press('Enter');
  

  // Wait for the site to fully load
  await page.waitForTimeout(3000);
  
  // find "VFX Financial" text anywhere on the page which is a h2 heading.
  const businessTitleExists = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h2')).some(h2 => 
      h2.textContent.trim() === 'VFX Financial'
    );
  });
  
  // Verify the title exists
  expect(businessTitleExists).toBeTruthy();
  console.log('Test passed: Found business information for VFX Financial');
});
