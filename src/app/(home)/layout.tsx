import { Footer } from "../../components/Footer";
import Header from "../../components/Header";

type Props = {
  children: React.ReactNode;
};
const HomeLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="px-8 bg-base-300">{children}</div>

      {/* <Footer /> */}
    </div>
  );
};

export default HomeLayout;
