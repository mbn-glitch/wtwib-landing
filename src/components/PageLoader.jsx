export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[200]">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-fiper animate-spin" />
      </div>
    </div>
  );
}
