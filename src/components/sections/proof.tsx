export function Proof() {
  const items = [
    "30 templates at launch",
    "10 new every month",
    "Captions included",
    "Commercial use",
  ];

  return (
    <div className="border-y border-line bg-card/40">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-5 text-[13px] text-muted lg:px-8">
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-8">
            {i > 0 && <span aria-hidden className="hidden h-1 w-1 rounded-full bg-line sm:block" />}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
