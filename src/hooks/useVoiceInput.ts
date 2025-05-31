
import { useToast } from "@/hooks/use-toast";

interface UseVoiceInputProps {
  setQuery: (query: string) => void;
  setIsListening: (isListening: boolean) => void;
}

export const useVoiceInput = ({ setQuery, setIsListening }: UseVoiceInputProps) => {
  const { toast } = useToast();

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };
      recognition.start();
    } else {
      toast({
        title: "Voice input not supported",
        description: "Please use the text input instead.",
        variant: "destructive"
      });
    }
  };

  return { handleVoiceInput };
};
