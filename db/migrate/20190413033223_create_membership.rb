class CreateMembership < ActiveRecord::Migration[5.2]
  def change
    create_table :memberships do |t|
      t.belongs_to :user, null: false
      t.belongs_to :family, null: false
    end
  end
end
