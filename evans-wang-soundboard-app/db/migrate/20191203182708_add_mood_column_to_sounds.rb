class AddMoodColumnToSounds < ActiveRecord::Migration[6.0]
  def change
    add_column :sounds, :mood, :string
  end
end
