class CreateFamily < ActiveRecord::Migration[5.2]
  def change
    create_table :families do |t|
      t.string :family_name, null: false
    end
  end
end
