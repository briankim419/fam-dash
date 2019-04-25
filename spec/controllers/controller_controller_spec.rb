require 'rails_helper'

RSpec.describe ControllerController, type: :controller do

  describe "GET #todoitems" do
    it "returns http success" do
      get :todoitems
      expect(response).to have_http_status(:success)
    end
  end

end
