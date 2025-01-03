// import { OpenAIApi, Configuration } from "openai-edge";

// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// // Convert the text into numerical vectors that Pinecone can index
// const model = "text-embedding-nomic-embed-text-v1.5";

// // export const getEmbeddings = async (content: any) => {
// //   const embeddings = await pc.inference.embed(
// //     model,
// //     content.map((d: any) => d.pageContent),
// //     { inputType: "passage", truncate: "END" }
// //   );

// //   return embeddings;
// // };

// const openai = new OpenAIApi(config);

// export async function getEmbeddings(text: string) {
//   try {
//     const response = await openai.createEmbedding({
//       model: "text-embedding-nomic-embed-text-v1.5",
//       input: text.replace(/\n/g, " "),
//     });
//     const result = await response.json();
//     return result.data[0].embedding as number[];
//   } catch (error) {
//     console.log("error calling openai embeddings api", error);
//     throw error;
//   }
// }
import axios from "axios";

// Define LM Studio API endpoint and model
const LM_STUDIO_URL =
  process.env.LM_STUDIO_URL || "http://0.0.0.0:1234/v1/embeddings";
const MODEL_ID = "text-embedding-nomic-embed-text-v1.5";

// Function to get embeddings from LM Studio
export async function getEmbeddings(text: string): Promise<number[]> {
  try {
    const response = await axios.post(LM_STUDIO_URL, {
      model: MODEL_ID, // Use the desired model
      input: text.replace(/\n/g, " "), // Preprocess text as needed
    });

    // Validate and return the embedding data
    if (
      response.data &&
      response.data.data &&
      response.data.data[0].embedding
    ) {
      return response.data.data[0].embedding as number[];
    } else {
      throw new Error("Invalid response from LM Studio embedding API");
    }
  } catch (error) {
    console.error("Error calling LM Studio embedding API:", error);
    throw error;
  }
}
