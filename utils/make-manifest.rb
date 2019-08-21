#!usr/bin/env ruby

require 'yaml'

file_list = []

Dir["src/*"].each do |f|
  file_list << f unless f.start_with?("src/_")
end

File.open("manifest.yml", "w") { |file| file.write(file_list.to_yaml) }

