module ApplicationHelper
  def page_title(title = '')
    base_title = 'FlowThing'
    title.present? ? "#{title} | #{base_title}" : base_title
  end

  def container_class_for_items_count(items_count)
    if items_count >= 5
      'red-background'
    elsif items_count >= 2
      'blue-background'
    else
      'default-background'
    end
  end

  def icon_class_for_items_count(items_count)
    if items_count >= 5
      ['bi bi-people-fill']
    elsif items_count >= 2
      ['bi bi-pen-fill', 'bi bi-people-fill']
    else
      ['default-icon']
    end
  end

  def blur_class_for_last_accessed(sub_user)
    return 'default-class' if sub_user.nil? || sub_user.last_accessed_at.nil?
    hours_elapsed = ((Time.current - sub_user.last_accessed_at) / 1.hour).round
    case hours_elapsed
    when 0..2
      'blur-0'
    when 2..24
      'blur-08'
    when 24..48
      'blur-1'
    when 48..120
      'item-card-container-in'
    else
      'blur-max'
    end
  end

end

