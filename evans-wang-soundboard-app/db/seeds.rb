# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
def list_folders
  base_path = Rails.root
  puts "Rails root at #{base_path}"
  repo_path = base_path.dirname
  puts "outer repo path is #{repo_path}"
  sounds_repo_path = repo_path.join('sounds_repo')
  puts "looking for sounds repo at path #{sounds_repo_path}"
  if !sounds_repo_path.directory?
    raise Error("can't find sounds_repo directory!")
  end
  sounds_repo_path_directory = Dir.new(sounds_repo_path)
  all_sounds_entries = sounds_repo_path_directory.children
  all_sounds_folders = all_sounds_entries.filter{|s| File.directory?(sounds_repo_path.join(s))}
  puts "Sounds directories: #{all_sounds_folders}"
  all_sounds_folders
end

def populate
  folders = list_folders
end

populate