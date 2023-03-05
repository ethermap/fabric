


// Installation
// $ npm install openai
// Usage
// The library needs to be configured with your account's secret key, which is available on the website. We recommend setting it as an environment variable. Here's an example of initializing the library with the API key loaded from an environment variable and creating a completion:

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "complete set 3 and set 5",
});
console.log(completion.data.choices[0].text);