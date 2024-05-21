class ItemsController < ApplicationController

  def index
    if @profile
      # URLからsub_user_idを取得し、@sub_userを設定
      @sub_user = SubUser.find(params[:sub_user_id]) if params[:sub_user_id]

      @q = Item.ransack(params[:q])
      sort_order = params[:q]&.fetch(:s, 'items.updated_at desc')
      @items = @q.result.includes(:sub_user)
                 .where(sub_users: { profile_id: @profile.id })
                 .order(sort_order)
                 .page(params[:page]).per(12)
    else
      redirect_to root_path
    end
  end
  
  

  def new
    @item = Item.new
    @sub_user = SubUser.find(params[:sub_user_id]) if params[:sub_user_id].present?
    @item.image_choice ||= "no_image"
  end

  def create
    @item = Item.new(item_params)

    case @item.image_choice
    when 'no_image'
      @item.item_canvas = nil
      @item.item_image = nil
    when 'item_image'
      @item.item_canvas = nil
    when 'item_canvas'
      @item.item_image = nil
    end

    if @item.save
      if request.headers['X-React-App'] == 'true'
        # Reactからのリクエストの場合
        render json: { redirect_url: item_path(@item) }, status: :created
      else
        redirect_to item_path(@item), success: t('defaults.flash_message.item_created', item: Item.model_name.human)
      end
    else
      if request.headers['X-React-App'] == 'true'
        render json: @item.errors, status: :unprocessable_entity
      else
        flash[:danger] = t('defaults.flash_message.item_not_created', item: Item.model_name.human)
        redirect_to root_path
      end
    end
  end

  def new_canvas
    @item = Item.new
    @sub_user = SubUser.find(params[:sub_user_id]) if params[:sub_user_id].present?
    @item.image_choice ||= "no_image"
  end


  def show
    @item = Item.find(params[:id])
    @sub_user = @item.sub_user
  end

  def canvas_edit
    @item = Item.find(params[:id])
    @sub_user = SubUser.find(params[:sub_user_id]) if params[:sub_user_id].present?
  end

  def edit
    @item = Item.find(params[:id])
    @sub_user = SubUser.find(params[:sub_user_id]) if params[:sub_user_id].present?
  end

  def update
    @item = Item.find(params[:id])

    case item_params[:image_choice]
    when 'no_image'
      @item.item_canvas = nil
      @item.item_image = nil
    when 'item_image'
      @item.item_canvas = nil
    when 'item_canvas'
      @item.item_image = nil
    end

    if @item.update(item_params)
      if request.headers['X-React-App'] == 'true'
        render json: { redirect_url: item_path(@item) }, status: :ok
      else
        redirect_to item_path(@item), success: t('defaults.flash_message.item_updated', item: Item.model_name.human)
      end
      else
      if request.headers['X-React-App'] == 'true'
        render json: @item.errors, status: :unprocessable_entity
      else
        flash[:danger] = t('defaults.flash_message.item_not_updated', item: Item.model_name.human)
        redirect_to root_path
      end
    end
    
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy!
    redirect_to items_path, success: t('defaults.flash_message.item_deleted', item: Item.model_name.human), status: :see_other
  end

  def episode_list
    @sub_users = SubUser.where(profile_id: current_user.profile.id)
  
    if params[:sub_user_id].present?
      @sub_user = SubUser.find(params[:sub_user_id])
      @episodes = @sub_user.items.select(:id, :episode)
    else
      sub_users_item_ids = @sub_users.joins(:items).select('items.id').distinct
      @episodes = Item.where(id: sub_users_item_ids).order('RANDOM()').select(:id, :episode)
    end
  end
  
  
  
  private

  def item_params
    params.require(:item).permit(:item_image, :item_canvas, :item_name, :item_text, :image_choice, :sub_user_id, :episode, :item_place, :item_save_canvas, :canvas_size )
  end
end
