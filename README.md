# AI-Powered Blog

This project is a simple blog where the content is automatically generated by the Gemini AI API. New posts are created every 30 minutes using GitHub Actions.

## Tech stack 📚

<p>
  <a href="https://nodejs.org/en">
    <img src="https://img.shields.io/badge/node.js-497BE1?style=for-the-badge&logo=node.js&logoColor=white" />
  </a>
  
  <a href="https://fastify.dev">
    <img src="https://img.shields.io/badge/fastify-497BE1?style=for-the-badge&logo=fastify&logoColor=white" />
  </a>

  <a href="https://ejs.co/">
    <img src="https://img.shields.io/badge/ejs-497BE1?style=for-the-badge&logo=ejs&logoColor=white" />
  </a>

  <a href="https://www.postgresql.org/">
    <img src="https://img.shields.io/badge/PostgreSQL-497BE1?style=for-the-badge&logo=postgresql&logoColor=white" />
  </a>

  <a href="https://www.prisma.io/">
    <img src="https://img.shields.io/badge/Prisma-497BE1?style=for-the-badge&logo=prisma&logoColor=white" />
  </a>

  <a href="https://github.com/features/actions">
    <img src="https://img.shields.io/badge/GitHub_Actions-497BE1?style=for-the-badge&logo=github-actions&logoColor=white" />
  </a>

  <a href="https://www.gemini.com/api/docs/">
    <img src="https://img.shields.io/badge/Gemini_API-497BE1?style=for-the-badge&logo=gemini&logoColor=white" />
  </a>
</p>


## Getting Started

1. Clone the repository.
2. Install dependencies: npm install
3. Create a .env file in the project root directory with the following variables:
    - API_KEY: Your Gemini API Key (https://ai.google.dev/docs?hl=pt-br)
    - POSTGRES_PRISMA_URL: Your Prisma connection string for development
    - POSTGRES_URL_NON_POOLING: Your Prisma connection string for non-pooling connections (optional)
    - PORT: The port on which the application will run (default: 3000)

Example .env:
```
API_KEY=your_api_key
POSTGRES_PRISMA_URL=postgres://user:password@host:port/database
POSTGRES_URL_NON_POOLING=postgres://user:password@host:port/database?sslmode=disable
PORT=3000
```
4. Run the application in development mode: `npm run dev`

The API should now be accessible at http://localhost:3000.

## Deployment
This project uses GitHub Actions to automatically generate new posts every 30 minutes. Configure your deployment process based on your preferred hosting platform.

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add caching to improve performance'`)
4. Push to the Branch (`git push origin feat/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is under the MIT license. See the [LICENSE](./LICENSE) file for more details.

---

Made with ♥ by [Jeffer Marcelino](https://github.com/JefferMarcelino/)
