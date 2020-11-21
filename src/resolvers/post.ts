import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "../types";

@Resolver()
export class PostResolver {

    @Query(() => [Post])
    async posts(@Ctx() { em }: MyContext): Promise<Post[] | {}[]> {
        return await em.find(Post, {});
    }

    @Query(() => Post, { nullable: true })
    async post(
        @Arg("id", () => Int) id: number,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        return await em.findOne(Post, id );
    } 

    @Mutation(() => Post)
    async createPost(
        @Arg("title") title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post> {
        const post = em.create(Post, { title });
        await em.persistAndFlush(post)
        return post;
    } 

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg("id") id: number,
        @Arg("title", () => String, { nullable: true }) title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        let post = await em.findOne(Post, id);
        if (!post) {
            return null;
        }

        if(title) {
            post.title = title;
            await em.persistAndFlush(post)
        }
        return post;
    } 

    @Mutation(() => Boolean)
    async deletePostByID(
        @Arg("id") id: number,
        @Ctx() { em }: MyContext
    ): Promise<Boolean> {
        await em.nativeDelete(Post, {id});
        return true;
    } 
}
