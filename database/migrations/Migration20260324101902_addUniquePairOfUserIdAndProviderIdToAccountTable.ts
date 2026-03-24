import { Migration } from '@mikro-orm/migrations';

export class Migration20260324101902_addUniquePairOfUserIdAndProviderIdToAccountTable extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "accounts" add constraint "accounts_user_id_id_provider_id_unique" unique ("user_id_id", "provider_id");`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "accounts" drop constraint "accounts_user_id_id_provider_id_unique";`,
    );
  }
}
