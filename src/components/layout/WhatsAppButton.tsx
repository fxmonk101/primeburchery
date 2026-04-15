import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phone = '12346008433';
  const message = encodeURIComponent('Hello! I have a question about your products.');
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
    >
      <MessageCircle className="w-7 h-7" fill="white" strokeWidth={0} />
    </a>
  );
}
