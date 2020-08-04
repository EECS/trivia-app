import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("Users", (table: Knex.TableBuilder) => {
        table.uuid('userId')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('Users')
}
