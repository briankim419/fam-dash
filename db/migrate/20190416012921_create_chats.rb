class CreateChats < ActiveRecord::Migration[5.2]
  def change
    create_table :chats do |t|
      t.integer :family_id, null: false
      t.timestamps
    end
  end
end
