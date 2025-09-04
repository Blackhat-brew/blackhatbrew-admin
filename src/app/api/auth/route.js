import { NextResponse } from "next/server";

// Set CORS headers
const setCORSHeaders = (response) => {
  response.headers.set('Access-Control-Allow-Origin', '*'); // Change '*' to your specific domain if needed (e.g., http://localhost:5173)
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
};

export function OPTIONS() {
  const response = NextResponse.json({});
  return setCORSHeaders(response);
}

export async function POST(request) {
  let success = true;
  let data = {};

  try {
    const { email, password } = await request.json(); // Parse the request body

    // Check if the email and password match the expected values
    if (email === 'S@foto@gmail.yum' && password === 'mxiqIO@J*(HNIAN;klsndj') {
      // if (email === 'a' && password === 'a') {
      data = { message: "Login successful" };
    } else {
      success = false;
      data = { message: "Invalid credentials" };
    }
  } catch (error) {
    console.error("Error occurred:", error);
    data = { message: "An error occurred while processing the request." };
    success = false;
  }

  // Set response status code (200 for success, 404 for failure)
  const response = NextResponse.json({ result: data, success }, { status: success ? 200 : 404 });
  return setCORSHeaders(response);
}
