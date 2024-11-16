import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AdicionandoEstacionamentoTabelaUsuarios1731451018296
  implements MigrationInterface
{
  tableName = 'usuarios';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'estacionamento',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, 'estacionamento');
  }
}
