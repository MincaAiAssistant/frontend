import { Button } from '@/components/ui/button';

export default function GoogleIntegrationPage() {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gmail Integration */}
          <div className="bg-white shadow-sm rounded-lg p-6 flex flex-col items-center">
            <img
              src={'/Logo gmail.png'}
              alt="Gmail Logo"
              className="w-24 h-auto mb-6"
            />
            <h3 className="text-lg font-medium mb-2">Gmail</h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Access and manage your emails with AI assistance
            </p>
            <Button
              className="bg-cyan-400 hover:bg-cyan-500 text-black px-6 text-sm mt-auto"
              size="sm"
            >
              Connect
            </Button>
          </div>

          {/* Google Drive Integration */}
          <div className="bg-white shadow-sm rounded-lg p-6 flex flex-col items-center">
            <img
              src={'/logo google drive.png'}
              alt="Google Drive Logo"
              className="w-24 h-auto mb-6"
            />
            <h3 className="text-lg font-medium mb-2">Google Drive</h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Access your documents and files for AI processing
            </p>
            <Button
              className="bg-cyan-400 hover:bg-cyan-500 text-black px-6 text-sm mt-auto"
              size="sm"
            >
              Connect
            </Button>
          </div>

          {/* Google Calendar Integration */}
          <div className="bg-white shadow-sm rounded-lg p-6 flex flex-col items-center">
            <img
              src={'/logo calendar.png'}
              alt="Google Calendar Logo"
              className="w-24 h-auto mb-6"
            />
            <h3 className="text-lg font-medium mb-2">Google Calendar</h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Schedule meetings and manage events with AI
            </p>
            <Button
              className="bg-cyan-400 hover:bg-cyan-500 text-black px-6 text-sm mt-auto"
              size="sm"
            >
              Connect
            </Button>
          </div>
        </div>

        <div className="mt-8 bg-white shadow-sm rounded-lg p-6">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">
              Benefits of Google Integration
            </h3>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              Integrating your Google services allows the AI assistant to
              provide personalized insurance recommendations, schedule claims
              appointments, and extract policy information from your emails and
              documents automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
