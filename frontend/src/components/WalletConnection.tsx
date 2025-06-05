
import { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Globe, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  getAssociatedTokenAddress,
} from "@solana/spl-token";

const WalletConnection = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [usdtBalance, setUSDTBalance] = useState<number | null>(null);
  const [solLoading, setSolLoading] = useState(false);
  const [usdtLoading, setUSDTLoading] = useState(false);
  const { toast } = useToast();

  const fetchSolBalance = async () => {
    if (!publicKey) return;
    
    setSolLoading(true);
    try {
      const balance = await connection.getBalance(publicKey);
      setSolBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Error fetching balance:', error);
      toast({
        title: "Error",
        description: "Failed to fetch balance",
        variant: "destructive"
      });
    } finally {
      setSolLoading(false);
    }
  };

  const fetchUSDTBalance = async () => {
    if (!publicKey) return;
    
    setUSDTLoading(true);
    try {
      const usdtATA = await getAssociatedTokenAddress(new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"), publicKey);
      const balance = await connection.getTokenAccountBalance(usdtATA);
      setUSDTBalance(balance.value.uiAmount);
    } catch (error) {
      console.error('Error fetching balance:', error);
      toast({
        title: "Error",
        description: "Failed to fetch balance",
        variant: "destructive"
      });
    } finally {
      setUSDTLoading(false);
    }
  };

  useEffect(() => {
    if (connected && publicKey) {
      fetchSolBalance();
      fetchUSDTBalance();
    }
  }, [connection, publicKey, connected]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-black/20 backdrop-blur-sm border-purple-500/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-purple-400" />
            Wallet Connection
          </CardTitle>
          <CardDescription className="text-gray-300">
            Connect your Phantom wallet to get started with Solana
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-pink-600 hover:!from-purple-700 hover:!to-pink-700 !border-none !rounded-lg" />
          </div>
          
          {connected && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Status:</span>
                <Badge className="bg-green-600 hover:bg-green-700">
                  Connected
                </Badge>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm text-gray-400">Public Key:</span>
                <div className="bg-black/30 p-3 rounded-lg font-mono text-xs break-all">
                  {publicKey?.toString()}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-black/20 backdrop-blur-sm border-purple-500/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              SOL Balance
            </div>
            {connected && (
              <Button
                variant="outline"
                size="sm"
                onClick={fetchSolBalance}
                disabled={solLoading}
                className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
              >
                <RefreshCw className={`w-4 h-4 ${solLoading ? 'animate-spin' : ''}`} />
              </Button>
            )}
          </CardTitle>
          <CardDescription className="text-gray-300">
            Your current SOL balance on Devnet
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!connected ? (
            <div className="text-center py-8 text-gray-400">
              Connect your wallet to view balance
            </div>
          ) : solLoading ? (
            <div className="text-center py-8 text-gray-400">
              Loading balance...
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                {solBalance !== null ? `${solBalance.toFixed(4)} SOL` : '--'}
              </div>
              <div className="text-sm text-gray-400 mt-2">
                Network: Devnet
              </div>
            </div>
          )}
        </CardContent>
      </Card>

       <Card className="bg-black/20 backdrop-blur-sm border-purple-500/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              USDT Balance
            </div>
            {connected && (
              <Button
                variant="outline"
                size="sm"
                onClick={fetchUSDTBalance}
                disabled={usdtLoading}
                className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
              >
                <RefreshCw className={`w-4 h-4 ${usdtLoading ? 'animate-spin' : ''}`} />
              </Button>
            )}
          </CardTitle>
          <CardDescription className="text-gray-300">
            Your current USDT balance on Devnet
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!connected ? (
            <div className="text-center py-8 text-gray-400">
              Connect your wallet to view balance
            </div>
          ) : usdtLoading ? (
            <div className="text-center py-8 text-gray-400">
              Loading balance...
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                {usdtBalance !== null ? `${usdtBalance} USDT` : '--'}
              </div>
              <div className="text-sm text-gray-400 mt-2">
                Network: Devnet
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletConnection;