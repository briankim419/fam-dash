class Api::V1::TodoitemsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  def index
    render json: Family.find(params[:family_id]).todoitems
  end

  def create
    todoitem = Todoitem.new(todoitems_params)
    if todoitem.save
      render json: Family.find(params[:family_id]).todoitems
    else
      render json: { error: todoitem.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def edit
    todo = Todoitem.find(params[:id].to_i)
    todo.complete_status = !todo.complete_status
    todo.save
    render json: todo
  end

  def destroy
    todo = Todoitem.find(params[:id].to_i)
    todo.delete
    render json: Family.find(params[:family_id]).todoitems
  end

  private

  def todoitems_params
    params.permit(:todotext, :family_id, :complete_status)
  end
end
