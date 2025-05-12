import { Button } from '@/components/ui/button';
import {
  getHubspotAccessToken,
  hubspotAuthorize,
  hubspotCallback,
} from '@/services/hubspot-services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CrmIntegrationPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const callbackMutation = useMutation({
    mutationKey: ['hubspot-callback'],
    mutationFn: (code: string) => hubspotCallback(code),
  });
  const authorizeMutation = useMutation({
    mutationKey: ['hubspot-authorize'],
    mutationFn: () => hubspotAuthorize(),
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['hubspot-access-token'],
    queryFn: () => getHubspotAccessToken(),
    refetchOnMount: true,
    staleTime: 0,
  });

  const handleConnectClick = async () => {
    try {
      setIsConnecting(true);
      const response = await authorizeMutation.mutateAsync();
      const authURL = response?.url;

      const width = 600;
      const height = 700;
      const left = window.screenX + (window.innerWidth - width) / 2;
      const top = window.screenY + (window.innerHeight - height) / 2;

      const newWindow = window.open(
        authURL,
        'HubSpot Authorization',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      const pollTimer = window.setInterval(() => {
        if (newWindow?.closed !== false) {
          window.clearInterval(pollTimer);
          handleWindowClosed();
        }
      }, 200);
    } catch {
      setIsConnecting(false);
    }
  };

  const handleWindowClosed = async () => {
    try {
      refetch();
      if (data) {
        setIsConnecting(false);
        setIsConnected(true);
      }
      setIsConnecting(false);
    } catch {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    if (data?.hubspot_access_token) setIsConnected(true);
    else setIsConnected(false);
  }, [data]);
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-10 max-w-2xl mx-auto">
          {isLoading || callbackMutation.isPending ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {/* HubSpot Logo */}
              <img
                src={'/logo hubspot.png'}
                alt="HubSpot Logo"
                className="w-48 h-auto mb-8"
              />

              <Button
                onClick={isConnected ? () => {} : handleConnectClick}
                disabled={isConnecting || isConnected}
                className="bg-cyan-400 hover:bg-cyan-500 text-black px-6 text-sm"
                size="sm"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="!h-3 !w-3 animate-spin" /> Connecting
                  </>
                ) : isConnected ? (
                  'Connected'
                ) : (
                  'Connect'
                )}
              </Button>

              <p className="mt-6 text-sm text-gray-500 text-center">
                Connect your HubSpot account to integrate customer data and
                enhance your AI assistant's capabilities.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
