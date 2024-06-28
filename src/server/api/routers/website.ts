import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { websites } from "@/server/db/schema";
import { count, eq } from "drizzle-orm";

export const websiteRouter = createTRPCRouter({
  getPublicWebsite: publicProcedure
    .input(z.object({ url: z.string().min(1).max(64) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.websites.findFirst({
          where: (websites, { eq }) => eq(websites.url, input.url),
      })
    }),

  getWebsite: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.websites.findFirst({
          where: (websites, { and, eq }) => and(eq(websites.id, input.id), eq(websites.createdById, ctx.session.user.id)),
      })
    }),

  getWebsitesUrls: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.db.select({ url: websites.url }).from(websites).where(eq(websites.createdById, ctx.session.user.id)).limit(5)
    }),

   deployWebsite: protectedProcedure
   .input(z.object({ url: z.string().min(1).max(64), content: z.string().min(1).max(30720) }))
   .mutation(async ({ ctx, input }) => {
     const existingWebsite = await ctx.db.query.websites.findFirst({
         where: (websites, { eq }) => eq(websites.url, input.url),
     });
     if (existingWebsite) {
       throw new Error("A website with this URL already exists");
     }

     const [websitesCounter] = await ctx.db.select({ count: count().mapWith(Number) }).from(websites).where(eq(websites.createdById, ctx.session.user.id));

     const websitesCount = websitesCounter?.count ?? 0;

     if (websitesCount >= 5) {
       throw new Error("You have reached the maximum number of websites");
     }

     return await ctx.db
       .insert(websites)
       .values({
         url: input.url,
         createdById: ctx.session.user.id,
         content: input.content,
         authorName: ctx.session.user.name ?? "Guest",
       })
       .returning();
   }),

   updateWebsite: protectedProcedure
   .input(z.object({ url: z.string(), content: z.string() }))
   .mutation(async ({ ctx, input }) => {
     return await ctx.db
       .update(websites)
       .set({ content: input.content })
       .where(eq(websites.url, input.url))
       .returning();
   }),

   deleteWebsite: protectedProcedure
   .input(z.object({ url: z.string() }))
   .mutation(async ({ ctx, input }) => {
     return await ctx.db
       .delete(websites)
       .where(eq(websites.url, input.url))
       .returning();
   }),
});

