class ApplicationController < ActionController::Base
  add_flash_types :success, :danger
  before_action :set_user_profile

  protected

  def set_user_profile
    @profile = current_user.profile if user_signed_in? && current_user.profile.present?
  end

  def after_sign_in_path_for(resource)
    if resource.is_a?(User) && resource.profile_needs_completion?
      new_profile_path
    else
      root_path
    end
  end

  def check_profile_completion
    if user_signed_in? && current_user.profile_needs_completion?
      redirect_to new_profile_path
    end
  end

  def after_sign_out_path_for(resource_or_scope)
    login_path
  end

  def check_user_status
    user = User.find(params[:id])
    if user.deleted_at
      redirect_to login_path
    end
  end

end
