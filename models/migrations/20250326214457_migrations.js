export function up(knex) {
    return knex.schema.createTable('warehouse', function(table) {
        table.increments("warehouseId");
        table.string("warehouseName").notNullable();
        table.text("address");
        table.string("contactName");
        table.string("contactNumber");
        table.string("contactEmail");
    })
}

export function down(knex) {
    return knex.schema.dropTable('warehouse');
}
