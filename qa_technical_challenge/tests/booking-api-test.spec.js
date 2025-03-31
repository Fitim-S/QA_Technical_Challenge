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

