# app/controllers/api/v1/documents_controller.rb
class Api::V1::DocumentsController < ApplicationController
  before_action :authenticate

  # List all documents for the current user
  def index
    user = User.find(request.session['user_id'])
    @documents = Document.where(user: user).map do |document|
      document.as_json.merge({ url: url_for(document.file) }) # Ensure each document has a 'url' field with Active Storage link
    end
    render json: @documents
  end

  # Create a new document for the current user
  def create
    user = User.find(request.session['user_id'])
    @document = user.documents.build(document_params)
    @document.name = params[:document][:file].original_filename

    if @document.save
      render json: @document, status: :created
    else
      render json: { errors: @document.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Delete a document
  def destroy
    @document = Document.find(params[:id])

    if @document.destroy
      render json: { message: 'Document was successfully deleted.' }, status: :ok
    else
      render json: { errors: 'Failed to delete the document.' }, status: :unprocessable_entity
    end
  end

  private

  def document_params
    # params.require(:document).permit(:name)
    params.require(:document).permit(:name, :file)
  end
end
