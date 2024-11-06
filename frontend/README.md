# Estate Settlement React App

## Overview
This project is a React-based frontend application designed for estate settlement purposes. It allows users to create, view, update, and delete assets associated with an estate. The app interfaces with a Ruby on Rails backend API, providing a structured environment for managing estate assets after a relative has passed away. This project is part of the CS-130 course.

## Features
1. **View Assets**: 
   - The application displays a list of assets with relevant details such as name, description, category, acquisition date, and location.
   - Each asset includes buttons for tracking its status: **Inventory**, **Value**, **Marshal**, and **Administer**.

2. **Add New Assets**:
   - Users can create new assets via a modal form, specifying details such as name, category (from a dropdown list of pre-defined categories), acquisition date, location, and description.
   - This form does not require a status input, as the status is tracked internally based on user actions.

3. **Edit Existing Assets**:
   - Users can click on an asset's name to open a modal for editing its details.
   - The modal includes options to **Save** the updates, **Delete** the asset, or **Close** without changes.
   - Each update is intended to be synced with the backend database, though updates to this functionality may be ongoing.

4. **Delete Assets**:
   - Users have the option to delete assets either directly from the asset list or through the edit modal. Deletions are synced with the backend.

## Current Setup
- **Frontend**: Built with React and styled using Bootstrap for a responsive UI.
- **Backend API**: Connects to a Rails API that manages asset data, including creating, updating, and deleting assets in the database.
- **API Endpoints**:
  - `GET /api/v1/assets` - Retrieve all assets.
  - `POST /api/v1/assets` - Create a new asset.
  - `PATCH /api/v1/assets/:id` - Update an asset’s information.
  - `DELETE /api/v1/assets/:id` - Delete an asset.

## Technologies Used
- **React**: Core frontend library.
- **Bootstrap**: For styling and UI components.
- **Axios**: For making API calls to the backend.
- **Ruby on Rails**: Backend server (API mode) for managing data storage and retrieval.

## Project Structure
- `src/components/`: Contains all major React components:
  - `AssetList.js`: Displays the list of assets with controls for each.
  - `NewAssetModal.js`: Form modal for adding a new asset.
  - `AssetModal.js`: Modal for editing an asset's information.
- `src/services/api.js`: Contains API request functions for interacting with the Rails backend.

## Setup Instructions
1. **Install dependencies**:
   ```bash
   npm install
