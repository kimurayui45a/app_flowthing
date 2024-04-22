class SubUsersController < ApplicationController
  before_action :set_sub_user, only: [:show, :edit, :update, :destroy]

  def index
    if @profile.present?
      @q = @profile.sub_users.ransack(params[:q])
      sort_order = params[:q]&.fetch(:s, 'sub_users.updated_at desc')
      @sub_users = @q.result
                    .order(sort_order)
                    .page(params[:page]).per(12)
    else
      redirect_to root_path
    end
  end

  
  def new
    @sub_user = SubUser.new
  end

  def show
    @sub_user = @profile.sub_users.find(params[:id])
  @items = @sub_user.items.order(created_at: :desc).page(params[:page]).per(20)
    if @sub_user.last_accessed_at.nil? || @sub_user.last_accessed_at < 10.minutes.ago
      @sub_user.update(last_accessed_at: Time.current)
    end
  end

  def edit
  end

  def canvas_edit
    @sub_user = @profile.sub_users.find(params[:id])
  end

  def update
    @sub_user = @profile.sub_users.find(params[:id])
    
    if @sub_user.update(sub_user_params)
      case @sub_user.icon_choice
      when 'sub_color'
        @sub_user.update(sub_canvas: nil, sub_image: nil)
      when 'sub_image'
        @sub_user.update(sub_canvas: nil, sub_color: nil)
      when 'sub_canvas'
        @sub_user.update(sub_image: nil, sub_color: nil)
      end
    end


    if @sub_user.update(sub_user_params)
      if request.headers['X-React-App'] == 'true'
        render json: { redirect_url: sub_user_path(@sub_user) }, status: :ok
      else
        redirect_to sub_user_path(@sub_user), success: t('defaults.flash_message.sub_user_updated', sub_user: SubUser.model_name.human)
      end
      else
      if request.headers['X-React-App'] == 'true'
        render json: @sub_user.errors, status: :unprocessable_entity
      else
        flash.now[:danger] = t('defaults.flash_message.sub_user_not_updated', sub_user: SubUser.model_name.human)
        render :edit, status: :unprocessable_entity
      end
    end
  end

  def destroy
    @sub_user.destroy!
    redirect_to sub_users_path, success: t('defaults.flash_message.sub_user_deleted', sub_user: SubUser.model_name.human), status: :see_other
  end

  def confirm_delete
    @sub_user = @profile.sub_users.find(params[:id])
  end

  private



  def set_sub_user
    @sub_user = @profile.sub_users.find(params[:id])
  end

  def sub_user_params
    params.require(:sub_user).permit(:sub_image, :sub_canvas, :sub_color, :sub_name, :sub_text, :icon_choice, :profile_id)
  end
end
