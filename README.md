# Nevercoder

Project created as a result of a challenge - write a simple Fullstack application with WYSIWYG editor in 1 day

## Used technologies
- T3 Stack (Next.js, tRPC, Tailwind)
- Next Auth
- Drizzle ORM
- Postgresql
- Shadcn ui

## Features
- Keep your tasks in the form of a kanban board (Todo, In progress, Done, Suspended)
- Authorization with GitHub OAuth
- Your tasks are stored in the cloud
- Your tasks are private (other users won't see them)
- Responsive design and UI/UX pleasant for: phone, tablet, laptop and computer

## Deployment and running locally
1. Create .env file (or use environment variables)
2. Set ***DATABASE_URL*** to your Postgresql db url (you can also use for example Supabase, Vercel postgres or Neon)
3. Set ***NEXTAUTH_SECRET*** to secret base64 string, you can generate one like this (type this in your terminal):

```sh
openssl rand -base64 32
```

4. ***NEXTAUTH_URL*** - on localhost you use **http://localhost:3000**, on Vercel you don't need to set this variable
5. ***GITHUB_CLIENT_ID*** and ***GITHUB_CLIENT_SECRET***  - go to [GitHub OAuth](https://github.com/settings/developers) and create new OAuth app
6. Type this in your terminal to migrate drizzle schema to Postgres database:
```sh
npm run db:push
```
7. You can start dev server like that:
```sh
npm run dev
```
8. Or deploy by following [these tutorials](https://create.t3.gg/en/deployment)

## License
2024 Hubert Kasperek

The project is available under the [MIT License](LICENSE)
