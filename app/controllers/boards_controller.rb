class BoardsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :destroy]

  def index
    @q = Board.ransack(params[:q])
    @boards = @q.result(distinct: true).includes(:profile, :item).order(created_at: :desc).page(params[:page]).per(10)
  end  
  

  def new
    @board = @profile.boards.new
  end

  def create
    @board = @profile.boards.build(board_params)
    free_category = Category.find_by(category_name: 'Free')
    @board.category = free_category

    if @board.save
      redirect_to board_path(@board), success: t('defaults.flash_message.board_created', board: Board.model_name.human)
    else
      flash.now[:danger] = t('defaults.flash_message.not_board_created', board: Board.model_name.human)
      render :new, status: :unprocessable_entity
    end
  end

  def item_new_board
    @board = @profile.boards.new
    @item = Item.find(params[:item_id])
  end

  def item_board_create
    @board = @profile.boards.build(board_params)
    question_category = Category.find_by(category_name: 'Question')
    @board.category = question_category

    if @board.save
      redirect_to board_path(@board), success: t('defaults.flash_message.created_with_item', item: Board.model_name.human)
    else
      if params[:item_id].present?
        @item = Item.find_by(id: params[:item_id])
      end
      if @item.nil?
        return render :new, status: :unprocessable_entity
      end
      flash.now[:danger] = t('defaults.flash_message.not_board_created', board: Board.model_name.human)
      render :item_new_board, status: :unprocessable_entity
    end
  end

  def show
    @board = Board.includes(:item).find(params[:id])
    @comment = Comment.new
    @comments = @board.comments.order(created_at: :desc).page(params[:page])
  end

  def destroy
    board = @profile.boards.find(params[:id])
    board.destroy!
    redirect_to boards_path, success: t('defaults.flash_message.board_deleted', board: Board.model_name.human), status: :see_other
  end

  def board_confirm_delete
    @board = @profile.boards.find(params[:id])
  end

  def myboards_list
    @my_boards = @profile.boards.includes(:item).order(created_at: :desc).page(params[:page]).per(5)
  end

  def free
    free_category = Category.find_by(category_name: 'Free')
    @free_boards = free_category.boards.includes(:profile, :item).order(created_at: :desc).page(params[:page]).per(10) if free_category
  end  

  def question
    question_category = Category.find_by(category_name: 'Question')
    @question_boards = question_category.boards.includes(:profile, :item).order(created_at: :desc).page(params[:page]).per(10) if question_category
  end  

  private

  def board_params
    params.require(:board).permit(:board_title, :board_text, :category_id, :item_id) 
  end
end
