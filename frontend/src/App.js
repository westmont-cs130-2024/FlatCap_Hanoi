// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import HomePage from './components/HomePage';
import AssetList from './components/AssetList';
import SignIn from './components/SignIn';
import CreateAccount from './components/CreateAccount';
import DebtList from './components/DebtList';
import Documents from './components/Documents';
import AccountPage from "./components/AccountPage";
import BeneficiariesList from "./components/BeneficiariesList";
import FAQPage from './components/FAQPage'; // Import the FAQPage component

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          {/* Define Routes */}
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/assets" element={<AssetList />} />
            <Route path="/debts" element={<DebtList />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/beneficiaries" element={<BeneficiariesList />} />
            <Route path="/faq" element={<FAQPage />} />

          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
