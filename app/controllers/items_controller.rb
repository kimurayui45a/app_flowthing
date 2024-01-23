class ItemsController < ApplicationController
  def index
    if @profile
      # アイテムと関連するサブユーザーの情報を事前にロード
      @items = Item.includes(:sub_user).where(sub_users: { profile_id: @profile.id })
    else
      redirect_to root_path
    end
  end

  def new
    @sub_user = SubUser.find(params[:sub_user_id]) if params[:sub_user_id].present?
    @item = Item.new(sub_user: @sub_user)
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
      redirect_to item_path(@item), success: t('defaults.flash_message.item_created', item: Item.model_name.human)
    else
      flash.now[:danger] = t('defaults.flash_message.item_not_updated', item: Item.model_name.human)
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @item = Item.find(params[:id])
    @sub_user = @item.sub_user
  end

  def edit
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy!
  end


  private

  def item_params
    params.require(:item).permit(:item_image, :item_canvas, :item_name, :item_text, :image_choice, :sub_user_id)
  end
end
