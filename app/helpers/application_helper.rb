module ApplicationHelper
  def page_title(title = '')
    base_title = 'FlowThing'
    title.present? ? "#{title} | #{base_title}" : base_title
  end
end