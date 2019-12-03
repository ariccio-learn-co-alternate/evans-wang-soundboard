# frozen_string_literal: true

require_relative '../../utils/errors.rb'

class Api::SoundsController < ApplicationController
  include Errors

  def list
    sounds = Sound.all.map do |sound|
      {
        id: sound.id,
        name: File.split(sound.path).last,
        sound_type: sound.sound_type,
        mood: sound.mood
      }

    end
    render json: {
      sounds: sounds
    }, status: :ok
  end


  def show
    # sound_params = show_params
    # byebug
    sound = Sound.find(params[:id])
    send_file sound.path, type: 'audio', disposition: 'inline', status: :ok 
  end

  # def show_params
  #   params.require(:sound).permit(:sound_id)
  # end
end