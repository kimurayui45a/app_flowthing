class ProfilesController < ApplicationController
  before_action :check_profile_completion, only: [:show, :edit]

  def new
    @profile = Profile.new
  end

  def create
    @profile = current_user.build_profile(profile_params)

    case profile_params[:selected_option]
    when 'color'
      @profile.image_icon = nil
    when 'image'
      @profile.color_code = nil
    end

    if @profile.save
      redirect_to root_path, success: t('defaults.flash_message.created', profile: Profile.model_name.human)
    else
      flash.now[:danger] = t('defaults.flash_message.not_created', profile: Profile.model_name.human)
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @profile = current_user.profile
  end

  def edit
    @profile = current_user.profile
  end

  def update
    @profile = current_user.profile
    case profile_params[:selected_option]
    when 'color'
      @profile.image_icon = nil
    when 'image'
      @profile.color_code = nil
    end

    if @profile.update(profile_params)
      redirect_to profile_path(@profile), success: t('defaults.flash_message.updated', profile: Profile.model_name.human)
    else
      flash.now[:danger] = t('defaults.flash_message.not_updated', profile: Profile.model_name.human)
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:name, :image_icon, :color_code, :profile_text, :selected_option)
  end
end
