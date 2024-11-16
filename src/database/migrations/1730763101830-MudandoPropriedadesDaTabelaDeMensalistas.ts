import { TipoVeiculoEnum } from '../../app/cadastro-mensalista/enum/tipo.enum';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class MudandoPropriedadesDaTabelaDeMensalistas1730763101830
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'mensalistas',
      'nome',
      new TableColumn({
        name: 'nome',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'mensalistas',
      'cpf',
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
        length: '11',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'mensalistas',
      'email',
      new TableColumn({
        name: 'email',
        type: 'varchar',
        length: '100',
        isUnique: true,
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'mensalistas',
      'whatsapp',
      new TableColumn({
        name: 'whatsapp',
        type: 'varchar',
        length: '11',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'mensalistas',
      'estacionamento_id',
      new TableColumn({
        name: 'estacionamento_id',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.addColumns('mensalistas', [
      new TableColumn({
        name: 'tipo',
        type: 'enum',
        enum: Object.values(TipoVeiculoEnum),
        isNullable: true,
      }),

      new TableColumn({
        name: 'descricao',
        type: 'varchar',
        isNullable: true,
      }),

      new TableColumn({
        name: 'vagas',
        type: 'varchar',
        isNullable: true,
      }),

      new TableColumn({
        name: 'placa',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('mensalistas', [
      'tipo',
      'descricao',
      'vagas',
      'placa',
    ]);

    await queryRunner.changeColumn(
      'mensalistas',
      'nome',
      new TableColumn({
        name: 'nome',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.changeColumn(
      'mensalistas',
      'cpf',
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
        length: '11',
        isNullable: false,
      }),
    );

    await queryRunner.changeColumn(
      'mensalistas',
      'email',
      new TableColumn({
        name: 'email',
        type: 'varchar',
        length: '100',
        isUnique: true,
        isNullable: false,
      }),
    );

    await queryRunner.changeColumn(
      'mensalistas',
      'whatsapp',
      new TableColumn({
        name: 'whatsapp',
        type: 'varchar',
        length: '11',
        isNullable: false,
      }),
    );

    await queryRunner.changeColumn(
      'mensalistas',
      'estacionamento_id',
      new TableColumn({
        name: 'estacionamento_id',
        type: 'int',
        isNullable: false,
      }),
    );
  }
}
