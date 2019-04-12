class CreatePhoto < ActiveRecord::Migration[5.2]
  def change
    create_table :photos do |t|
      t.belongs_to :post
      t.string :photo_url
    end
  end
end
