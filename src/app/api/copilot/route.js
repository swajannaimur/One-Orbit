import { CopilotRuntime, GoogleGenerativeAIAdapter } from "@copilotkit/runtime";

const runtime = new CopilotRuntime({
  adapter: new GoogleGenerativeAIAdapter({
    model: "gemini-1.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});

export const POST = runtime.handleRequest;
