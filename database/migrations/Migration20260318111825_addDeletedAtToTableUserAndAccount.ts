import { Migration } from '@mikro-orm/migrations';

export class Migration20260318111825_addDeletedAtToTableUserAndAccount extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "sessions" drop constraint "sessions_user_id_id_foreign";`,
    );

    this.addSql(
      `alter table "accounts" drop constraint "accounts_user_id_id_foreign";`,
    );

    this.addSql(
      `alter table "users" add column "deleted_at" timestamptz null;`,
    );
    this.addSql(`alter table "users" alter column "id" drop default;`);
    this.addSql(
      `alter table "users" alter column "id" type uuid using ("id"::text::uuid);`,
    );
    this.addSql(
      `alter table "users" alter column "id" set default gen_random_uuid();`,
    );
    this.addSql(
      `create index "users_deleted_at_index" on "users" ("deleted_at");`,
    );

    this.addSql(`alter table "sessions" alter column "id" drop default;`);
    this.addSql(
      `alter table "sessions" alter column "id" type uuid using ("id"::text::uuid);`,
    );
    this.addSql(
      `alter table "sessions" alter column "id" set default gen_random_uuid();`,
    );
    this.addSql(
      `alter table "sessions" alter column "user_id_id" drop default;`,
    );
    this.addSql(
      `alter table "sessions" alter column "user_id_id" type uuid using ("user_id_id"::text::uuid);`,
    );
    this.addSql(
      `alter table "sessions" add constraint "sessions_user_id_id_foreign" foreign key ("user_id_id") references "users" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "accounts" add column "deleted_at" timestamptz null;`,
    );
    this.addSql(`alter table "accounts" alter column "id" drop default;`);
    this.addSql(
      `alter table "accounts" alter column "id" type uuid using ("id"::text::uuid);`,
    );
    this.addSql(
      `alter table "accounts" alter column "id" set default gen_random_uuid();`,
    );
    this.addSql(
      `alter table "accounts" alter column "user_id_id" drop default;`,
    );
    this.addSql(
      `alter table "accounts" alter column "user_id_id" type uuid using ("user_id_id"::text::uuid);`,
    );
    this.addSql(
      `alter table "accounts" add constraint "accounts_user_id_id_foreign" foreign key ("user_id_id") references "users" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `create index "accounts_deleted_at_index" on "accounts" ("deleted_at");`,
    );

    this.addSql(`alter table "verifications" alter column "id" drop default;`);
    this.addSql(
      `alter table "verifications" alter column "id" type uuid using ("id"::text::uuid);`,
    );
    this.addSql(
      `alter table "verifications" alter column "id" set default gen_random_uuid();`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "accounts" alter column "id" type text using ("id"::text);`,
    );
    this.addSql(
      `alter table "accounts" alter column "user_id_id" type text using ("user_id_id"::text);`,
    );

    this.addSql(
      `alter table "accounts" drop constraint "accounts_user_id_id_foreign";`,
    );

    this.addSql(
      `alter table "sessions" alter column "id" type text using ("id"::text);`,
    );
    this.addSql(
      `alter table "sessions" alter column "user_id_id" type text using ("user_id_id"::text);`,
    );

    this.addSql(
      `alter table "sessions" drop constraint "sessions_user_id_id_foreign";`,
    );

    this.addSql(
      `alter table "users" alter column "id" type text using ("id"::text);`,
    );

    this.addSql(
      `alter table "verifications" alter column "id" type text using ("id"::text);`,
    );

    this.addSql(`drop index "accounts_deleted_at_index";`);
    this.addSql(`alter table "accounts" drop column "deleted_at";`);

    this.addSql(`alter table "accounts" alter column "id" drop default;`);
    this.addSql(
      `alter table "accounts" alter column "id" type varchar(255) using ("id"::varchar(255));`,
    );
    this.addSql(
      `alter table "accounts" alter column "user_id_id" type varchar(255) using ("user_id_id"::varchar(255));`,
    );
    this.addSql(
      `alter table "accounts" add constraint "accounts_user_id_id_foreign" foreign key ("user_id_id") references "users" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(`alter table "sessions" alter column "id" drop default;`);
    this.addSql(
      `alter table "sessions" alter column "id" type varchar(255) using ("id"::varchar(255));`,
    );
    this.addSql(
      `alter table "sessions" alter column "user_id_id" type varchar(255) using ("user_id_id"::varchar(255));`,
    );
    this.addSql(
      `alter table "sessions" add constraint "sessions_user_id_id_foreign" foreign key ("user_id_id") references "users" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(`drop index "users_deleted_at_index";`);
    this.addSql(`alter table "users" drop column "deleted_at";`);

    this.addSql(`alter table "users" alter column "id" drop default;`);
    this.addSql(
      `alter table "users" alter column "id" type varchar(255) using ("id"::varchar(255));`,
    );

    this.addSql(`alter table "verifications" alter column "id" drop default;`);
    this.addSql(
      `alter table "verifications" alter column "id" type varchar(255) using ("id"::varchar(255));`,
    );
  }
}
