import React from 'react';
import SolanaProvider from '../components/SolanaProvider';
import Dashboard from '../components/Dashboard';

const Index = () => {
  return (
    <SolanaProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Solana Bootcamp
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Master Solana development through hands-on experience with wallet connection, transactions, and blockchain data
            </p>
          </div>
          <Dashboard />
        </div>
      </div>
    </SolanaProvider>
  );
};

export default Index;