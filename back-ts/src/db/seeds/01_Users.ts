import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("Users").del();

    // Inserts seed entries
    await knex("Users").insert([
        { userName: "Jacob", email: "jacobshnn@gmail.com", password: "$2b$10$wpzPy6Om36UxKGhdgQuoQOGw6Vg7O9ROrSe22UQZyMBwXxasHegXK" }
    ]);
};
