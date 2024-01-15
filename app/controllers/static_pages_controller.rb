class StaticPagesController < ApplicationController
  def top
    if user_signed_in?
      @profile = current_user.profile if current_user.profile.present?
    end

    def usersselect; end

    def newcontents; end

    def create_all
      
    end
  end
end
