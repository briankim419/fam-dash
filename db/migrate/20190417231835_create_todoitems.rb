class CreateTodoitems < ActiveRecord::Migration[5.2]
  def change
    create_table :todoitems do |t|
      t.string :todotext, null: false
      t.boolean :complete_status, null: false
      t.integer :family_id, null: false
      t.timestamps
    end
  end
end
