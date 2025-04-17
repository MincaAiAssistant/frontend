interface MincaLogoProps {
  className?: string;
}

export function MincaLogo({ className }: MincaLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <img src={'/logo blanc.jpg'} alt="MincaAI Logo" className="h-full" />
    </div>
  );
}
