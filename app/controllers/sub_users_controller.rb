class SubUsersController < ApplicationController
  before_action :set_sub_user, only: [:show, :edit, :update, :destroy]

  def index
    @sub_users = @profile.sub_users.includes(:items)
  end

  def new
    @sub_user = SubUser.new
  end

  def show
  end

  def edit
  end

  def update
    if @sub_user.update(sub_user_params)
      redirect_to sub_user_path(@sub_user), success: t('defaults.flash_message.sub_user_updated', sub_user: SubUser.model_name.human)
    else
      flash.now[:danger] = t('defaults.flash_message.sub_user_not_updated', sub_user: SubUser.model_name.human)
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @sub_user.destroy
    redirect_to sub_users_path, success: t('defaults.flash_message.deleted', sub_user: SubUser.model_name.human), status: :see_other
  end

  private

  def set_sub_user
    @sub_user = @profile.sub_users.find(params[:id])
  end

  def sub_user_params
    params.require(:sub_user).permit(:sub_image, :sub_canvas, :sub_color, :sub_name, :sub_text, :icon_choice, :profile_id)
  end
end
