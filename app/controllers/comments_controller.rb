class CommentsController < ApplicationController

  def create
    @comment = @profile.comments.build(comment_params)
    @comment.save
  end

  private

  def comment_params
    params.require(:comment).permit(:comment_text, :comment_title).merge(board_id: params[:board_id])
  end
end
