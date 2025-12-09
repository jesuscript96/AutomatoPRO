import Link from 'next/link';
import ColorizedTitle from '@/components/ui/ColorizedTitle';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="text-center">
        <ColorizedTitle
          text="404"
          tag="h1"
          className="text-9xl font-bold text-black mb-4"
        />
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="mb-8 text-gray-600">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
