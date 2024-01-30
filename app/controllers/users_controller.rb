class UsersController < ApplicationController


  def destroy
    current_user.destroy
    sign_out(current_user)
    redirect_to root_path, notice: 'アカウントが削除されました。'
  end

end

