import fastify from "fastify";
import cors from "@fastify/cors";
import view from "@fastify/view";
import { PrismaClient } from '@prisma/client';
import ejs from "ejs"
import path from 'path';
import dayjs from "dayjs";
import showdown from "showdown";
import { run } from "./generator";

const app = fastify();

app.register(cors);
app.register(view, {
  engine: {
    ejs: ejs,
  },
  root: path.join(__dirname, 'templates')
});

const converter = new showdown.Converter({
  omitExtraWLInCodeBlocks: true,
  simplifiedAutoLink: true,
  strikethrough: true
});

const prisma = new PrismaClient();

app.get('/', async (request, reply) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    reply.type('text/html').code(200);
    return reply.view('index.ejs', { posts: posts.map(item => {
      return {
        ...item,
        createdAt: dayjs(item.createdAt).format('MMMM D, YYYY')
      }
    }) });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    reply.status(500);
    return 'Error fetching blog posts';
  }
});

app.get('/post/:postId', async (request, reply) => {
  try {
    const { postId } = request.params as { postId: string }

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    });

    if (!post) {
      reply.code(404);
      return 'Post not found';
    }

    const formattedCreatedAt = dayjs(post.createdAt).format('MMMM D, YYYY');

    reply.type('text/html').code(200);
    return reply.view('post.ejs', { 
      post: { 
        ...post, 
        createdAt: formattedCreatedAt,
        content: converter.makeHtml(post.content)
      }, 
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return 'Error fetching blog post';
  }
});

app.get('/generate', async (request, reply) => {
  try {
    await run();
    return { message: "Okay " };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    reply.status(500);
    return 'Error fetching blog posts';
  }
});

app.listen({
  host: "0.0.0.0",
  port: Number(process.env.PORT) || 3000,
}).then((url) => {
  console.log("HTTP Server running at ", url);
});