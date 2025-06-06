
import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Send, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

const MessageBoard = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Simulate fetching messages from blockchain
  useEffect(() => {
    // In a real implementation, this would fetch from an Anchor program
    const mockMessages: Message[] = [
      {
        id: '1',
        author: 'DemoUser1',
        content: 'Welcome to the Solana Message Board! This is where we learn about blockchain data.',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        author: 'DemoUser2',
        content: 'Building on Solana is amazing! The speed and low costs are incredible.',
        timestamp: new Date(Date.now() - 1800000)
      },
      {
        id: '3',
        author: 'DemoUser3',
        content: 'Day 3 of the bootcamp: Learning about Anchor and program interactions!',
        timestamp: new Date(Date.now() - 900000)
      }
    ];
    setMessages(mockMessages);
  }, []);

  const handleSendMessage = async () => {
    if (!connected || !publicKey || !newMessage.trim()) return;
    
    setLoading(true);
    try {
      // In a real implementation, this would interact with an Anchor program
      // For demo purposes, we'll simulate the blockchain interaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const message: Message = {
        id: Date.now().toString(),
        author: publicKey.toString().slice(0, 8) + '...',
        content: newMessage,
        timestamp: new Date()
      };
      
      setMessages(prev => [message, ...prev]);
      setNewMessage('');
      
      toast({
        title: "Message Posted!",
        description: "Your message has been added to the blockchain",
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Failed to Post",
        description: "Could not post message to the blockchain",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <Card className="bg-black/20 backdrop-blur-sm border-purple-500/20 text-white">
        <CardContent className="text-center py-12">
          <div className="text-gray-400">
            Please connect your wallet to use the message board
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1 bg-black/20 backdrop-blur-sm border-purple-500/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-400" />
            Post Message
          </CardTitle>
          <CardDescription className="text-gray-300">
            Send a message to the Solana blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-300">Your Message</Label>
            <Textarea
              id="message"
              placeholder="Share your thoughts on the blockchain..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-black/30 border-purple-500/30 text-white placeholder-gray-500 min-h-[120px]"
              maxLength={280}
            />
            <div className="text-xs text-gray-400 text-right">
              {newMessage.length}/280
            </div>
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={loading || !newMessage.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            {loading ? 'Posting...' : 'Post to Blockchain'}
          </Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 bg-black/20 backdrop-blur-sm border-purple-500/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-green-400" />
            Message Board
          </CardTitle>
          <CardDescription className="text-gray-300">
            Messages stored on the Solana blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-black/30 p-4 rounded-lg border border-purple-500/20"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-purple-300 text-sm">
                    {message.author}
                  </span>
                  <span className="text-xs text-gray-400">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageBoard;