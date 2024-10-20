import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterandoTabelaEstacionamentoEDropEmProprietariosFuncionariosTabela1729436582654
  implements MigrationInterface
{
  estacionamentoTable = 'estacionamento';
  proprietarioTable = 'proprietario';
  funcionarioTable = 'funcionario';
  usuariosTable = 'usuarios';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.estacionamentoTable);
    const foreignKeys = table.foreignKeys;
    for (const fk of foreignKeys) {
      await queryRunner.dropForeignKeys(this.estacionamentoTable, [fk]);
    }

    await queryRunner.dropColumns(this.estacionamentoTable, [
      'proprietario_id',
      'funcionario_id',
    ]);

    await queryRunner.dropTable(this.proprietarioTable);
    await queryRunner.dropTable(this.funcionarioTable);

    await queryRunner.addColumn(
      this.estacionamentoTable,
      new TableColumn({
        name: 'usuario_id',
        type: 'int',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      this.estacionamentoTable,
      new TableForeignKey({
        columnNames: ['usuario_id'],
        referencedColumnNames: ['id'],
        referencedTableName: this.usuariosTable,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.estacionamentoTable);
    const foreignKeys = table.foreignKeys;
    for (const fk of foreignKeys) {
      await queryRunner.dropForeignKey(this.estacionamentoTable, fk);
    }

    await queryRunner.dropColumn(this.estacionamentoTable, 'usuario_id');

    await queryRunner.createTable(
      new Table({
        name: this.proprietarioTable,
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
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar',
            length: '11',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isUnique: true,
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
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            onUpdate: 'now()',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: this.funcionarioTable,
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

    await queryRunner.addColumns(this.estacionamentoTable, [
      new TableColumn({
        name: 'proprietario_id',
        type: 'int',
        isNullable: false,
      }),
      new TableColumn({
        name: 'funcionario_id',
        type: 'int',
        isNullable: false,
      }),
    ]);

    await queryRunner.createForeignKeys(this.estacionamentoTable, [
      new TableForeignKey({
        columnNames: ['proprietario_id'],
        referencedColumnNames: ['id'],
        referencedTableName: this.proprietarioTable,
      }),
      new TableForeignKey({
        columnNames: ['funcionario_id'],
        referencedColumnNames: ['id'],
        referencedTableName: this.funcionarioTable,
      }),
    ]);
  }
}
