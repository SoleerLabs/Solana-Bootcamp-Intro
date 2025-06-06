
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WalletConnection from './WalletConnection';
import TransactionPanel from './TransactionPanel';
import MessageBoard from './MessageBoard';
import { Wallet, Send, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('wallet');

  return (
    <div className="max-w-6xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-black/20 backdrop-blur-sm">
          <TabsTrigger 
            value="wallet" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            <Wallet className="w-4 h-4" />
            Day 1: Wallet
          </TabsTrigger>
          <TabsTrigger 
            value="transactions" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            <Send className="w-4 h-4" />
            Day 2: Transactions
          </TabsTrigger>
          <TabsTrigger 
            value="messages" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            <MessageSquare className="w-4 h-4" />
            Day 3: Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="wallet" className="space-y-6">
          <WalletConnection />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <TransactionPanel />
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <MessageBoard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;