class CompositesController < ApplicationController
  before_action :set_composite, only: [:show, :edit, :update, :destroy]

  def index
    @composites = Composite.all
  end

  def show
    @items = @profile.items if @profile.present?
    @spaces = @profile.spaces if @profile.present?
    @sub_users = @profile.sub_users if @profile.present?
  end

  def new
    @composite = Composite.new
    @items = @profile.items if @profile.present?
    @spaces = @profile.spaces if @profile.present?
    @sub_users = @profile.sub_users if @profile.present?
  end

  def edit
    @items = @profile.items if @profile.present?
    @spaces = @profile.spaces if @profile.present?
    @sub_users = @profile.sub_users if @profile.present?
  end

  def create
    @composite = Composite.new(composite_params)
    if @composite.save
      render json: { redirect_url: composite_url(@composite) }, status: :created
    else
      render json: { errors: @composite.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @composite.update(composite_params)
      render json: { redirect_url: composite_url(@composite) }, status: :ok
    else
      render json: @composite.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @composite.destroy
    redirect_to composites_url, notice: 'Composite was successfully destroyed.'
  end

  def confirm_delete
    @composite = @profile.composites.find(params[:id])
  end

  private
    def set_composite
      @composite = @profile.composites.find(params[:id])
    end

    def composite_params
      params.require(:composite).permit(:composite_name, :composite_text, :composite_space, :composite_item, :composite_image, :profile_id, :space_id)
    end

end
