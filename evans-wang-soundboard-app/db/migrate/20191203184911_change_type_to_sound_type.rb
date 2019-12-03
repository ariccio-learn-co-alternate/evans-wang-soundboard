class ChangeTypeToSoundType < ActiveRecord::Migration[6.0]
  def change
    change_table(:sounds) do |t|
      t.rename :type, :sound_type
    end
  end
end
