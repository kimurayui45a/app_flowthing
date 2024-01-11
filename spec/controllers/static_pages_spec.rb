require 'rails_helper'

RSpec.describe "StaticPages", type: :request do
  describe "GET root" do
    it "トップページにアプリ名が表示されるか" do
      get root_path
      expect(response).to have_http_status(:success)
      expect(response.body).to include("Flow Thing")
    end
  end
end
