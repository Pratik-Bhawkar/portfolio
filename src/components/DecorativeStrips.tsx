// No backdrop images, just colored strips


function StripRow({ reverse, speed = 50, color }: { reverse?: boolean; speed?: number; color?: string }) {
  // Render large, smooth, high-quality colored strips
  return (
    <div
      className={`relative flex w-[350%] items-center gap-12 opacity-90 ${
        reverse ? 'animate-marquee-reverse' : 'animate-marquee'
      }`}
      style={{ animationDuration: `${speed}s` }}
    >
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className="h-[45vh] w-[30vw] flex-shrink-0 rounded-3xl shadow-2xl"
          style={{ background: color || `linear-gradient(135deg, #E50914 60%, #222 100%)`, opacity: 0.9 }}
        />
      ))}
    </div>
  )
}

export default function DecorativeStrips({ color }: { color?: string }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <div className="absolute left-0 right-0 top-[10%]">
        <StripRow speed={60} color={color} />
      </div>
      <div className="absolute left-0 right-0 top-[38%]">
        <StripRow reverse speed={70} color={color} />
      </div>
      <div className="absolute left-0 right-0 top-[66%]">
        <StripRow speed={65} color={color} />
      </div>
      <div className="absolute left-0 right-0 top-[88%]">
        <StripRow reverse speed={75} color={color} />
      </div>
    </div>
  )
}
// DecorativeStrips component removed as per user request.
