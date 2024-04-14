import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

const prisma = new PrismaClient();

const createPost = async (
  title: string, 
  content: string, 
) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });

    console.log("New post created: ", newPost);
  } catch (error) {
    console.error("Error creating post:", error);
  } finally {
    await prisma.$disconnect();
  };
};

export const run = async () => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const titles = (await prisma.post.findMany({
      select: {
        title: true
      }
    })).map(item => item.title);

    const prompt = `Write a complete article discussing a topic within software development and programming (Java, Python, Ruby, Go, Javascript, Typescript, etc). # for main title (the topic choosed, the first title will always have one #), ## for subtitles (the titles following the main title), ### for sub-subtitles, and so on. Followed by Markdown-formatted content. Please adhere to the following structure. Each section should include relevant content in Markdown format. Please ensure that the article covers the topic comprehensively and includes multiple sections with detailed information.

    Example:
    # Main title
    
    Some intro here

    ## Subtitle

    Something else

    ## Another

    Other things

    More things...
    `
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const [ title, ...contentWithTagsAndImage ] = text.split("\n");

    await createPost(
      title.replace(/#/g, "").trim(),
      contentWithTagsAndImage.join("\n")
    );
  } catch (error) {
    console.error("Error creating post:", error);
  } finally {
    await prisma.$disconnect();
  };
};
