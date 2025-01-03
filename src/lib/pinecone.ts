"use server";
// import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";

// import {
//   Document,
//   RecursiveCharacterTextSplitter,
// } from "@pinecone-database/doc-splitter";
// import { getEmbeddings } from "./embeddings";
// // import { getEmbeddings } from "./embeddings";
// // import { convertToAscii } from "./utils";

// export const getPineconeClient = () => {
//   const apiKey = process.env.PINECONE_API_KEY;
//   if (!apiKey) {
//     throw new Error(
//       "PINECONE_API_KEY is not defined in environment variables."
//     );
//   }
//   return new Pinecone({
//     apiKey,
//   });
// };

// export async function pineconeSplitter(fileData: string) {
//   // 2. split and segment the pdf
//   const documents = await prepareDocument(fileData);

//   const data = await getEmbeddings();
//   console.log(data);

//   return "done";

//   // 3. vectorise and embed individual documents
//   //   const vectors = await Promise.all(documents.flat().map(embedDocument));

//   // 4. upload to pinecone
//   const client = await getPineconeClient();
//   const pineconeIndex = await client.index("online-classroom");
//   //   const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

//   console.log("inserting vectors into pinecone");
//   //   await namespace.upsert(vectors);

//   //   return documents[0];
// }

// export const truncateStringByBytes = (str: string, bytes: number) => {
//   const enc = new TextEncoder();
//   return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
// };

// async function prepareDocument(fileContent: string) {
//   let pageContent = fileContent;
//   pageContent = pageContent.replace(/\n/g, "");
//   // split the docs
//   const splitter = new RecursiveCharacterTextSplitter();
//   const docs = await splitter.splitDocuments([
//     new Document({
//       pageContent,
//       metadata: {
//         text: truncateStringByBytes(pageContent, 36000),
//       },
//     }),
//   ]);
//   return docs;
// }

import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { randomUUID } from "crypto";

import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";
import md5 from "md5";
export const getPineconeClient = () => {
  const apiKey = process.env.PINECONE_API_KEY;
  if (!apiKey) {
    throw new Error(
      "PINECONE_API_KEY is not defined in environment variables."
    );
  }
  return new Pinecone({
    apiKey,
  });
};

export async function pineconeSplitter(fileData: string) {
  try {
    const documents = await prepareDocument(fileData);

    const vectors = [];
    for (const doc of documents.flat()) {
      const vector = await embedDocument(doc);
      vectors.push(vector);
    }

    // 4. upload to pinecone
    const client = await getPineconeClient();
    const pineconeIndex = await client.index("online-classroom");
    const randName = randomUUID();
    const namespace = pineconeIndex.namespace(randName);

    await namespace.upsert(vectors);

    return randName;
  } catch (error) {
    console.error("Error in pineconeSplitter:", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};
async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.pageContent,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}
async function prepareDocument(fileContent: string) {
  const pageContent = fileContent;

  const splitter = new RecursiveCharacterTextSplitter();
  return await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
}
