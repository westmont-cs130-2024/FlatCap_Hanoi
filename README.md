# Hanoi Estate Settlement Application

## Overview
Hanoi is a comprehensive estate settlement application built to assist executors in managing and distributing estate assets after a loved one's passing. It provides a structured, user-friendly interface to handle assets, debts, beneficiaries, and related documentation. Built with a React frontend and Ruby on Rails backend, it streamlines the complex process of estate management.

---

## Authors

- Connor Rogstad - Full Stack Developer
- Eli Tiao - Full Stack Developer
- Ella McMillan - Full Stack Developer
- Emma Johnson - Full Stack Developer
- David Melesse - Full Stack Developer

---

## Features

### Asset Management:
- Four-stage asset tracking: Inventory, Value, Marshal, and Administer
- Timestamp tracking for each stage
- Support for multiple asset types
- Value tracking and status updates
- Location and acquisition date tracking

### Debt Management:
- Track total amount, amount paid, and outstanding balance
- Payment history tracking
- Debt categorization
- Status updates (partial/full payment)
- Multiple debt types support

### Beneficiary Management:
- Add and track beneficiary information
- Associate multiple assets with beneficiaries
- Contact information management
- Distribution tracking
- Notes and details storage

### Document Management:
- Secure document upload and storage
- Document categorization
- File management system
- Document tracking and organization

---

## Technical Setup

### Backend Setup

#### Install Dependencies:
```bash
bundle install
```

#### Database Setup:
```bash
rails db:drop db:create db:migrate
```

#### Start Rails Server:
```bash
rails s -p 3001
```

### Frontend Setup

#### Navigate to Frontend:
```bash
cd frontend
```

#### Install Dependencies:
```bash
npm install
```

#### Start Development Server:
```bash
npm start
```

---

## API Endpoints

### Assets
- **GET** `/api/v1/assets` - Retrieve all assets
- **POST** `/api/v1/assets` - Create new asset
- **PATCH** `/api/v1/assets/:id` - Update asset
- **DELETE** `/api/v1/assets/:id` - Delete asset
- **POST** `/api/v1/assets/:id/add_beneficiaries` - Add beneficiaries to asset

### Beneficiaries
- **GET** `/api/v1/beneficiaries` - List beneficiaries
- **POST** `/api/v1/beneficiaries` - Create beneficiary
- **PATCH** `/api/v1/beneficiaries/:id` - Update beneficiary
- **DELETE** `/api/v1/beneficiaries/:id` - Delete beneficiary

### Debts
- **GET** `/api/v1/debts` - List debts
- **POST** `/api/v1/debts` - Create debt
- **PATCH** `/api/v1/debts/:id` - Update debt
- **DELETE** `/api/v1/debts/:id` - Delete debt

### Documents
- **GET** `/api/v1/documents` - List documents
- **POST** `/api/v1/documents` - Upload document
- **DELETE** `/api/v1/documents/:id` - Delete document

### Users
- **POST** `/api/v1/users` - Create user
- **POST** `/api/v1/users/sign_in` - User login
- **GET** `/api/v1/users/current_user` - Get current user

---

## Technologies Used

### Frontend:
- React
- Bootstrap
- Axios
- React Context

### Backend:
- Ruby on Rails 7.2.1
- SQLite3
- Active Storage
- Session Authentication

---

## Project Structure

### Backend Structure
- `app/controllers/api/v1/` - API controllers
- `app/models/` - Data models
- `app/services/` - Business logic
- `storage/` - File storage

### Frontend Structure
- `src/components/` - React components
- `src/services/` - API services
- `src/context/` - React context
- `src/utils/` - Utility functions

---

## Prerequisites
- Ruby >= 3.0.0
- Rails >= 7.2.1
- Node.js (Latest LTS)
- npm (Latest stable)
- SQLite3

---

## Access Points
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:3001`

---

## Known Issues
- Enhanced browser compatibility needed
- Partial payment tracking for debts in development
- Additional user guidance features planned
- Document page cleanup in progress

---

## Future Improvements
- Enhanced FAQ integration
- Additional user guidance features
- Payment history improvements
- Enhanced document management

---

## Support
For questions or issues, please contact the development team.


