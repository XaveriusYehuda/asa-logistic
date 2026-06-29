import { Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingEmailButton() {

  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;

      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress =
        docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(progress);
      setVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", updateScrollProgress);

    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Pengaturan Email dan Template Chat
  const emailTujuan = "asalogistic.office@gmail.com";
  // const emailTujuan = "xyehuda3@gmail.com";
  const subjekEmail = "Tanya Jawab Layanan EMKL";
  const isiEmail = "Halo Tim,\n\nSaya ingin menanyakan informasi lebih lanjut mengenai...";

  // Encode parameter agar aman digunakan di dalam URL
  const mailtoUrl = `mailto:${emailTujuan}?subject=${encodeURIComponent(subjekEmail)}&body=${encodeURIComponent(isiEmail)}`;

  return (
    <a
      href={mailtoUrl}
      className={`
        fixed
        z-50
        w-15
        h-15
        flex
        items-center
        justify-center
        rounded-full
        bg-red-calm
        text-white
        shadow-xl
        hover:scale-110
        hover:bg-red-800
        active:scale-95
        ${
          visible
            ? "bottom-27 right-10"
            : "bottom-8 right-10"
        }
        transition-all
        duration-300
        group
      `}
      title="Hubungi Kami via Email"
    >
      {/* Efek Ping Mengapung Ringan */}
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-calm opacity-25 pointer-events-none"></span>
      
      {/* Ikon Email */}
      <Mail
        size={26}
        className="relative z-10 group-hover:rotate-12 transition-transform duration-300"
      />
    </a>
  );
}