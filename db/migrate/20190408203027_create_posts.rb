class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :body, null: false
      t.integer :family_id, null: false
      t.timestamps
    end
  end
end
