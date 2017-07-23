class ApiController < ApplicationController
  def show
    @subject = Subject.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @subject}
    end
  end
end
