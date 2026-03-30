import { Migration } from '@mikro-orm/migrations';

export class Migration20260330063741_UpdateColumnIdDefaultFromDbToAppHandling extends Migration {
  override up(): void | Promise<void> {
    this.addSql(`alter table "users" alter column "id" drop default;`);

    this.addSql(`alter table "sessions" alter column "id" drop default;`);

    this.addSql(`alter table "accounts" alter column "id" drop default;`);

    this.addSql(`alter table "verifications" alter column "id" drop default;`);
  }

  override down(): void | Promise<void> {
    this.addSql(
      `alter table "accounts" alter column "id" set default gen_random_uuid();`,
    );

    this.addSql(
      `alter table "sessions" alter column "id" set default gen_random_uuid();`,
    );

    this.addSql(
      `alter table "users" alter column "id" set default gen_random_uuid();`,
    );

    this.addSql(
      `alter table "verifications" alter column "id" set default gen_random_uuid();`,
    );
  }
}
