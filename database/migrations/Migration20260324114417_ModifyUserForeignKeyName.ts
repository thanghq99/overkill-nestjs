import { Migration } from '@mikro-orm/migrations';

export class Migration20260324114417_ModifyUserForeignKeyName extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "sessions" drop constraint "sessions_user_id_id_foreign";`,
    );
    this.addSql(
      `alter table "accounts" drop constraint "accounts_user_id_id_foreign";`,
    );
    this.addSql(
      `alter table "sessions" rename column "user_id_id" to "user_id";`,
    );
    this.addSql(
      `alter table "sessions" add constraint "sessions_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "accounts" drop constraint "accounts_user_id_id_provider_id_unique";`,
    );
    this.addSql(
      `alter table "accounts" rename column "user_id_id" to "user_id";`,
    );
    this.addSql(
      `alter table "accounts" add constraint "accounts_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "accounts" add constraint "accounts_user_id_provider_id_unique" unique ("user_id", "provider_id");`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "accounts" drop constraint "accounts_user_id_foreign";`,
    );
    this.addSql(
      `alter table "sessions" drop constraint "sessions_user_id_foreign";`,
    );
    this.addSql(
      `alter table "accounts" drop constraint "accounts_user_id_provider_id_unique";`,
    );
    this.addSql(
      `alter table "accounts" rename column "user_id" to "user_id_id";`,
    );
    this.addSql(
      `alter table "accounts" add constraint "accounts_user_id_id_foreign" foreign key ("user_id_id") references "users" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "accounts" add constraint "accounts_user_id_id_provider_id_unique" unique ("user_id_id", "provider_id");`,
    );
    this.addSql(
      `alter table "sessions" rename column "user_id" to "user_id_id";`,
    );
    this.addSql(
      `alter table "sessions" add constraint "sessions_user_id_id_foreign" foreign key ("user_id_id") references "users" ("id") on update cascade on delete cascade;`,
    );
  }
}
