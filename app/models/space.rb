class Space < ApplicationRecord
  belongs_to :profile
  has_many :composites, dependent: :destroy
  before_destroy :check_composites

  private

  def check_composites
    self.composites.each do |composite|
      if some_condition
        composite.destroy
      end
    end
  end
end
