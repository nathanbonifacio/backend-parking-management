import { TipoClienteEnum } from '../../app/entradas-e-saidas/enum/tipo-cliente.enum';
import { FormaPagamentoEnum } from '../../app/entradas-e-saidas/enum/forma-pagamento.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriacaoEntradaSaidaTabela1733079369229
  implements MigrationInterface
{
  tableName = 'entrada_saida';

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
          { name: 'veiculo_id', type: 'int', isNullable: true },
          { name: 'estacionamento_id', type: 'int', isNullable: true },
          { name: 'horario_saida', type: 'timestamp', isNullable: true },
          { name: 'valor_pago', type: 'double', isNullable: true },
          {
            name: 'forma_pagamento',
            type: 'enum',
            enum: Object.values(FormaPagamentoEnum),
            isNullable: true,
          },
          { name: 'data_pagamento', type: 'datetime', isNullable: true },
          {
            name: 'tipo_cliente',
            type: 'enum',
            enum: Object.values(TipoClienteEnum),
            isNullable: true,
          },
          {
            name: 'cpf_mensalista',
            type: 'varchar',
            length: '11',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            onUpdate: 'now()',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['veiculo_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'veiculos',
          },
          {
            columnNames: ['estacionamento_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'estacionamento',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
