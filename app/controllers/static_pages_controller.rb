class StaticPagesController < ApplicationController

  def top
    if user_signed_in?
      @profile = current_user.profile if current_user.profile.present?
    end
    
    @composites = @profile.composites if @profile.present?
    @items = @profile.items if @profile.present?
    @spaces = @profile.spaces if @profile.present?
    @sub_users = @profile.sub_users if @profile.present?
  end

  def info; end

  def usersselect
    @sub_users = @profile.sub_users
    @spaces = @profile.spaces
    @items = @profile.items
  end

  def newcontents
    @sub_user = SubUser.new
    @item = Item.new
    @item.image_choice ||= "no_image"
  end

  def create_all
    ActiveRecord::Base.transaction do
      @sub_user = create_sub_user
      @item = create_items(@sub_user)
    end

    redirect_to sub_user_path(@sub_user), success: t('defaults.flash_message.created')
  rescue ActiveRecord::RecordInvalid => e
    flash[:danger] = t('defaults.flash_message.userall_not_updated')
    redirect_to root_path
  end

  private

  def create_sub_user
    sub_user = @profile.sub_users.create!(sub_user_params)
    adjust_sub_user_attributes(sub_user)
    sub_user
  end

  def adjust_sub_user_attributes(sub_user)
    case sub_user_params[:icon_choice]
    when 'sub_color'
      sub_user.update!(sub_image: nil, sub_canvas: nil)
    when 'sub_image'
      sub_user.update!(sub_canvas: nil, sub_color: nil)
    when 'sub_canvas'
      sub_user.update!(sub_image: nil, sub_color: nil)
    end
  end

  def create_items(sub_user)
    item = sub_user.items.create!(item_params)
    adjust_item_attributes(item)
    item
  end

  def adjust_item_attributes(item)
    case item_params[:image_choice]
    when 'no_image'
      item.update!(item_canvas: nil, item_image: nil)
    when 'item_image'
      item.update!(item_canvas: nil)
    when 'item_canvas'
      item.update!(item_image: nil)
    end
  end

  def sub_user_params
    params.require(:sub_user).permit(:sub_image, :sub_canvas, :sub_color, :sub_name, :sub_text, :icon_choice, :profile_id)
  end

  def item_params
    params.require(:item).permit(:item_image, :item_canvas, :item_name, :item_text, :image_choice, :sub_user_id, :episode, :item_place)
  end

  # def new_sample; end

  # def sub_sample; end

  # def flow_sample; end

  # def episode_sample; end

  def how_to_use; end

  def tool_explanation; end

  def tool_explanation_second; end

  def tool_explanation_third; end

  def tool_explanation_anime; end

  def idea_page; end

  def idea_page_second; end

  def paint_help; end
  
end