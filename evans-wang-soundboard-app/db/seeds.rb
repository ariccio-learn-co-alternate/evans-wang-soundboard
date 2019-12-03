# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

BAD_MOODS = [
  'embarrassing',
  'kidding',
  'rethink',
  'hmm',
  'ohman',
  'smell',
  'whoops',
  'hip',
  'no',
  'whomp'
  ]

GOOD_MOODS = [
  'powerful',
  'wild',
  'hey',
  'seed',
  'classy',
  'noice',
  'swaglord',
  'fire',
  'like-a-g-0',
  'magical',
  'spicy',
  'megabless'
]

def sounds_repo_path_str
  base_path = Rails.root
  puts "Rails root at #{base_path}"
  repo_path = base_path.dirname
  puts "outer repo path is #{repo_path}"
  sounds_repo_path = repo_path.join('sounds_repo')
  puts "looking for sounds repo at path #{sounds_repo_path}"
  if !sounds_repo_path.directory?
    raise Error("can't find sounds_repo directory!")
  end
  sounds_repo_path
end

def list_folders(sounds_repo)
  sounds_repo_path_directory = Dir.new(sounds_repo)
  all_sounds_entries = sounds_repo_path_directory.children
  all_sounds_folders = all_sounds_entries.filter{|s| File.directory?(sounds_repo.join(s))}
  puts "Sounds directories: #{all_sounds_folders}"
  all_sounds_folders
end


def mood_type(folder_name)

  if BAD_MOODS.include?(folder_name)
    return 'bad'
  end

  if GOOD_MOODS.include?(folder_name)
    return 'good'
  end

  'neutral'
end

def all_files_in_folder(sounds_repo_path, folder)
  this_dir_path = sounds_repo_path.join(folder)
  this_dir = Dir.new(this_dir_path)
  this_dir.children.each do |file|
    Sound.create!(path: sounds_repo_path.join(file), sound_type: folder, mood: mood_type(folder))
  end
end


def populate
  sounds_repo = sounds_repo_path_str
  folders = list_folders(sounds_repo)
  folders.each do |folder|
    puts "processing folder #{folder}"
    all_files_in_folder(sounds_repo, folder)
  end
end

populate