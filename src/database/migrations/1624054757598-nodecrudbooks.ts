import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class nodecrudbooks1624054757598 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [{
          name: 'id',
          type: 'varchar(36)',
          isPrimary: true
        }, {
          name: 'name',
          type: 'varchar'
        }, {
          name: 'pages',
          type: 'int'
        }, {
          name: 'author',
          type: 'varchar'
        }, {
          name: 'year',
          type: 'int'
        }, {
          name: 'publisher',
          type: 'varchar'
        }, {
          name: 'genre',
          type: 'varchar'
        }, {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()'
        }, {
          name: 'user_id',
          type: 'varchar(36)'
        }], 
        foreignKeys: [{
          name: 'FKUser',
          referencedTableName: 'user',
          referencedColumnNames: ['id'],
          columnNames: ['user_id']
        }]
      })
    )
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books')
  }

}
