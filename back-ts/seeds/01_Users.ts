import * as Knex from "knex";
import { v4 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("Users").del();

    // Inserts seed entries
    await knex("Users").insert([
        { userName: "Jacob" }
    ]);
};
