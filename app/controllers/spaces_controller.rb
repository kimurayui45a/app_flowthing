class SpacesController < ApplicationController
  before_action :set_space, only: [:show, :edit, :update, :destroy]

  def index
    @spaces = Space.all
  end

  def show
  end

  def new
    @space = Space.new
  end

  def edit
  end

  def create
    @space = Space.new(space_params)
    if @space.save
      render json: { redirect_url: space_url(@space) }, status: :created
    else
      render json: { errors: @space.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @space.update(space_params)
      render json: { redirect_url: space_url(@space) }, status: :ok
    else
      render json: @space.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @space.destroy
    redirect_to spaces_url, notice: 'Space was successfully destroyed.'
  end

  def confirm_delete
    @space = @profile.spaces.find(params[:id])
  end

  private
    def set_space
      @space = @profile.spaces.find(params[:id])
    end

    def space_params
      params.require(:space).permit(:space_name, :space_text, :space_canvas, :space_save_canvas, :profile_id)
    end
end