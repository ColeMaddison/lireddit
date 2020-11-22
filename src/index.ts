import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__, __port__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express"; 
import { buildSchema } from "type-graphql";
import { Hello } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [Hello, PostResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em })
    });

    apolloServer.applyMiddleware({ app });

    app.listen(__port__, () => {
        console.log(`Server is up and running on port:: ${__port__}`);
    });
};
 
main().catch(e => {
    console.error(e);
});
