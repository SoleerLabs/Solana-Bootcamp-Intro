import React, { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Globe, RefreshCw, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  getAccount,
  getAssociatedTokenAddress
} from '@solana/spl-token';

// USDC Devnet mint address
const USDC_MINT = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');

const WalletConnection = () => {
  const { connection } = useConnection();
  const { publicKey, connected, signTransaction } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [usdcBalance, setUsdcBalance] = useState<number | null>(null);
  const [loadingUsdc, setLoadingUsdc] = useState(false);
  const { toast } = useToast();

  const fetchBalance = async () => {
    if (!publicKey) return;
    
    setLoading(true);
    try {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Error fetching balance:', error);
      toast({
        title: "Error",
        description: "Failed to fetch balance",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUSDCBalance = async () => {
    if (!publicKey) return;
    
    setLoadingUsdc(true);
    try {
      const associatedTokenAddress = await getAssociatedTokenAddress(
        USDC_MINT,
        publicKey
      );

      try {
        const accountInfo = await getAccount(connection, associatedTokenAddress);
        setUsdcBalance(Number(accountInfo.amount) / 1_000_000);
      } catch (error) {
        // Account doesn't exist yet
        setUsdcBalance(0);
      }
    } catch (error) {
      console.error('Error fetching USDC balance:', error);
      toast({
        title: "Error",
        description: "Failed to fetch USDC balance",
        variant: "destructive"
      });
    } finally {
      setLoadingUsdc(false);
    }
  };

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance();
      fetchUSDCBalance();
    }
  }, [connection, publicKey, connected, signTransaction]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                onClick={fetchBalance}
                disabled={loading}
                className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
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
          ) : loading ? (
            <div className="text-center py-8 text-gray-400">
              Loading balance...
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                {balance !== null ? `${balance.toFixed(4)} SOL` : '--'}
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
              <Coins className="w-5 h-5 text-blue-400" />
              USDC Balance
            </div>
            {connected && (
              <Button
                variant="outline"
                size="sm"
                onClick={fetchUSDCBalance}
                disabled={loadingUsdc}
                className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
              >
                <RefreshCw className={`w-4 h-4 ${loadingUsdc ? 'animate-spin' : ''}`} />
              </Button>
            )}
          </CardTitle>
          <CardDescription className="text-gray-300">
            Your current USDC balance on Devnet
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!connected ? (
            <div className="text-center py-8 text-gray-400">
              Connect your wallet to view balance
            </div>
          ) : loadingUsdc ? (
            <div className="text-center py-8 text-gray-400">
              Loading balance...
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                {usdcBalance !== null ? `${usdcBalance.toFixed(2)} USDC` : '--'}
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