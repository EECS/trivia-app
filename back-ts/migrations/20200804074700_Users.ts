import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("Users", (table: Knex.TableBuilder) => {
        table.increments();
        table.string("userName")
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('Users')
}
