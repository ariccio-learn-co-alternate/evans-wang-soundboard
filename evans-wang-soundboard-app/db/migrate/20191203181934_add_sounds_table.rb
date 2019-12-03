class AddSoundsTable < ActiveRecord::Migration[6.0]
  def change
    create_table :sounds do |t|
      t.string :path
      t.string :type
    end
  end
end
