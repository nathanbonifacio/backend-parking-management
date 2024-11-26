import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AdicionandoColunaHorasTabelaEstacionamento1732644120020
  implements MigrationInterface
{
  tableName = 'estacionamento';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(this.tableName, [
      new TableColumn({ name: 'valor_hora', type: 'double', isNullable: true }),
      new TableColumn({
        name: 'valor_mais_horas',
        type: 'double',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns(this.tableName, [
      'valor_hora',
      'valor_mais_horas',
    ]);
  }
}
