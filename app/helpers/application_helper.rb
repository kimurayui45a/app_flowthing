module ApplicationHelper
  def page_title(title = '')
    base_title = 'FlowThing'
    title.present? ? "#{title} | #{base_title}" : base_title
  end

  def container_class_for_items_count(items_count)
    if items_count >= 50
      'red-background'
    elsif items_count >= 40
      'purple-background'
    elsif items_count >= 30
      'blue-background'
    elsif items_count >= 25
      'melon-background'
    elsif items_count >= 20
      'light-blue-background'
    elsif items_count >= 15
      'green-background'
    elsif items_count >= 10
      'sakura-background'
    elsif items_count >= 5
      't-red-background'
    elsif items_count >= 3
      'yellowgreen-background'
    elsif items_count >= 1
      'yellow-background'
    else
      'default-background'
    end
  end

  def icon_class_for_items_count(items_count)
    if items_count >= 50
      ['bi bi-piggy-bank', 'bi bi-controller', 'bi bi-balloon-heart', 'bi bi-airplane-engines', 'bi bi-rocket-takeoff', 'bi bi-globe-asia-australia', 'bi bi-moon-stars', 'bi bi-sun-fill', 'bi bi-award', 'bi bi-trophy']
    elsif items_count >= 40
      ['bi bi-piggy-bank', 'bi bi-controller', 'bi bi-balloon-heart', 'bi bi-airplane-engines', 'bi bi-rocket-takeoff', 'bi bi-globe-asia-australia', 'bi bi-moon-stars', 'bi bi-sun-fill', 'bi bi-award']
    elsif items_count >= 30
      ['bi bi-piggy-bank', 'bi bi-controller', 'bi bi-balloon-heart', 'bi bi-airplane-engines', 'bi bi-rocket-takeoff', 'bi bi-globe-asia-australia', 'bi bi-moon-stars', 'bi bi-sun-fill']
    elsif items_count >= 25
      ['bi bi-piggy-bank', 'bi bi-controller', 'bi bi-balloon-heart', 'bi bi-airplane-engines', 'bi bi-rocket-takeoff', 'bi bi-globe-asia-australia', 'bi bi-moon-stars']
    elsif items_count >= 20
      ['bi bi-piggy-bank', 'bi bi-controller', 'bi bi-balloon-heart', 'bi bi-airplane-engines', 'bi bi-rocket-takeoff', 'bi bi-globe-asia-australia']
    elsif items_count >= 15
      ['bi bi-piggy-bank', 'bi bi-controller', 'bi bi-balloon-heart', 'bi bi-airplane-engines', 'bi bi-rocket-takeoff']
    elsif items_count >= 10
      ['bi bi-piggy-bank', 'bi bi-controller', 'bi bi-balloon-heart', 'bi bi-airplane-engines']
    elsif items_count >= 5
      ['bi bi-piggy-bank', 'bi bi-controller', 'bi bi-balloon-heart']
    elsif items_count >= 3
      ['bi bi-piggy-bank', 'bi bi-controller']
    elsif items_count >= 1
      ['bi bi-piggy-bank']
    else
      ['default-icon']
    end
  end

  def blur_class_for_last_accessed(sub_user)
    return 'default-class' if sub_user.nil? || sub_user.last_accessed_at.nil?
    hours_elapsed = ((Time.current - sub_user.last_accessed_at) / 1.hour).round
    case hours_elapsed
    when 0..2
      'blur-0-card'
    when 3..24
      'blur-1-card'
    when 25..72
      'blur-2-card'
    when 73..168
      'blur-3-card'
    when 169..720
      'blur-4-card'
    when 721..1464
      'blur-5-card'
    when 1465..2184
      'blur-6-card'
    when 2185..2568
      'blur-7-card'
    when 2569..4392
      'item-card-container-gray'
    when 4393..8760
      'item-card-container-black'
    else
      'item-card-container-redblack'
    end
  end
end




