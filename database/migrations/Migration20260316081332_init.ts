import { Migration } from '@mikro-orm/migrations';

export class Migration20260316081332_init extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "users" ("id" varchar(255) not null, "name" varchar(255) not null, "email" varchar(255) not null, "email_verified" boolean not null default false, "image" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "users_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "users" add constraint "users_email_unique" unique ("email");`,
    );

    this.addSql(
      `create table "sessions" ("id" varchar(255) not null, "user_id_id" varchar(255) not null, "token" varchar(255) not null, "expires_at" timestamptz not null, "ip_address" varchar(255) null, "user_agent" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "sessions_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "sessions" add constraint "sessions_token_unique" unique ("token");`,
    );

    this.addSql(
      `create table "accounts" ("id" varchar(255) not null, "user_id_id" varchar(255) not null, "account_id" varchar(255) not null, "provider_id" varchar(255) not null, "access_token" text null, "refresh_token" text null, "access_token_expires_at" timestamptz null, "refresh_token_expires_at" timestamptz null, "scope" varchar(255) null, "id_token" text null, "password" text null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "accounts_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "accounts" add constraint "accounts_provider_id_account_id_unique" unique ("provider_id", "account_id");`,
    );

    this.addSql(
      `create table "verifications" ("id" varchar(255) not null, "identifier" varchar(255) not null, "value" varchar(255) not null, "expires_at" timestamptz not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "verifications_pkey" primary key ("id"));`,
    );

    this.addSql(
      `alter table "sessions" add constraint "sessions_user_id_id_foreign" foreign key ("user_id_id") references "users" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "accounts" add constraint "accounts_user_id_id_foreign" foreign key ("user_id_id") references "users" ("id") on update cascade on delete cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "sessions" drop constraint "sessions_user_id_id_foreign";`,
    );

    this.addSql(
      `alter table "accounts" drop constraint "accounts_user_id_id_foreign";`,
    );

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "sessions" cascade;`);

    this.addSql(`drop table if exists "accounts" cascade;`);

    this.addSql(`drop table if exists "verifications" cascade;`);
  }
}
