# app/helpers/assets_helper.rb
module AssetsHelper
  def button_class(asset, action)
    case action
    when 'inventory'
      asset.inventory? ? 'btn btn-outline-success' : 'btn btn-outline-secondary'
    when 'value'
      asset.value? ? 'btn btn-outline-primary' : 'btn btn-outline-secondary'
    when 'marshal'
      asset.marshal? ? 'btn btn-outline-warning' : 'btn btn-outline-secondary'
    when 'administer'
      asset.administer? ? 'btn btn-outline-danger' : 'btn btn-outline-secondary'
    else
      'btn btn-outline-secondary'
    end
  end
end
