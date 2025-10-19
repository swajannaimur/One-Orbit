import { CopilotRuntime } from "@copilotkit/react-core";
import { GoogleGenerativeAIAdapter } from "@copilotkit/google-genai-adapter";

const runtime = new CopilotRuntime({
  adapter: new GoogleGenerativeAIAdapter({
    model: "gemini-1.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});

export const POST = runtime.handleRequest;
