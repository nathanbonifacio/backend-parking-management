import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriacaoDaTabelaDeFuncionarios1727812303394
  implements MigrationInterface
{
  tableName = 'funcionario';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'cpf_funcionario',
            type: 'varchar',
            length: '11',
            isNullable: false,
          },
          {
            name: 'cpf_proprietario',
            type: 'varchar',
            length: '11',
            isNullable: false,
          },
          {
            name: 'whatsapp',
            type: 'varchar',
            length: '11',
            isNullable: false,
          },
          {
            name: 'senha',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            onUpdate: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
