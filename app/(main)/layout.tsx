import Nav from "@/components/layout/Nav";
import BottomNav from "@/components/layout/BottomNav";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import IntroScreen from "@/components/ui/IntroScreen";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <IntroScreen />
      <CustomCursor />
      <SmoothScroll>
        <Nav />
        <main className="min-h-screen pb-[140px] tablet:pb-0">
          {children}
        </main>
        <BottomNav />
      </SmoothScroll>
    </>
  );
}
