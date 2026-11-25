const lightLogo = {
  src: "/Images/LogoLightModeFinal.png",
  width: 1206,
  height: 1221,
};

export default function NavbarBrand({ image = lightLogo }) {
  return (
    <span className="flex items-center gap-2.5">
      <img
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        loading="lazy"
        className="h-auto w-12 shrink-0"
      />
      <span className="whitespace-nowrap font-body text-[17px] font-[800] leading-[1.05] tracking-[0.02em] md:text-[21px]">
        Ancestors
        &amp; Anecdotes
      </span>
    </span>
  );
}
