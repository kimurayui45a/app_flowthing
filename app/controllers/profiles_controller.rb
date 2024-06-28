class ProfilesController < ApplicationController
  before_action :check_profile_completion, only: [:show, :edit]
  # before_action :check_user_status,  only:[:show]

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
    # @profile = current_user.profile
  end

  def edit
    # @profile = current_user.profile
  end

  def update
    # @profile = current_user.profile
    case profile_params[:selected_option]
    when 'color'
      @profile.image_icon = nil
    when 'image'
      @profile.color_code = nil
    end

    if @profile.update(profile_params)
      redirect_to profile_path(@profile), success: t('defaults.flash_message.updated', profile: Profile.model_name.human)
    else
      # flash.now[:danger] = t('defaults.flash_message.not_updated', profile: Profile.model_name.human)
      render :edit, status: :unprocessable_entity
    end
  end


  def icon_edit
    # @profile = current_user.profile
  end

  def icon_edit_canvas
    # @profile = current_user.profile
  end


  def update_icon
    # @profile = current_user.profile

    if @profile.update(profile_icon_params)
      if request.headers['X-React-App'] == 'true'
        render json: { redirect_url: profile_path(@profile) }, status: :ok
      else
        redirect_to profile_path(@profile), notice: t('defaults.flash_message.updated', profile: Profile.model_name.human)
      end
    else
      if request.headers['X-React-App'] == 'true'
        render json: @profile.errors, status: :unprocessable_entity
      else
        flash.now[:danger] = t('defaults.flash_message.not_updated', profile: Profile.model_name.human)
        render :edit, status: :unprocessable_entity
      end
    end
  end



  def update_tool
    # @profile = current_user.profile

    if @profile.update(profile_tool_params)
      if request.headers['X-React-App'] == 'true'
        render json: { redirect_url: profile_path(@profile) }, status: :ok
      else
        redirect_to profile_path(@profile), notice: t('defaults.flash_message.updated', profile: Profile.model_name.human)
      end
    else
      if request.headers['X-React-App'] == 'true'
        render json: @profile.errors, status: :unprocessable_entity
      else
        flash.now[:danger] = t('defaults.flash_message.not_updated', profile: Profile.model_name.human)
        render :edit, status: :unprocessable_entity
      end
    end
  end




  private

  def profile_params
    params.require(:profile).permit(:name, :image_icon, :color_code, :profile_text, :selected_option, :space_size, :profile_canvas, :profile_icon, :tool_data)
  end


  def profile_icon_params
    params.require(:profile).permit(:profile_canvas)
  end


  def profile_tool_params
    params.require(:profile).permit(:tool_data)
  end


end
