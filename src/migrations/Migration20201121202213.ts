import { Migration } from '@mikro-orm/migrations';

export class Migration20201121202213 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null;');
  }

}
