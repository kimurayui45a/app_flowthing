class ApplicationController < ActionController::Base
  add_flash_types :success, :danger

  protected
  def after_sign_in_path_for(resource)
    root_path
  end

  def after_sign_out_path_for(resource_or_scope)
    login_path
  end
end
