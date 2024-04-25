import Link from "next/link";
import bg from "../../../public/assets/first_cover.png";
export default function Home() {
  // const navigate = useNavigate();

  // function continueHandler(): any {
  //   console.log('Continue');
  //   navigate('/mint_page');
  // }

  return (
    // HERE if u want a background pic
    // TODO: set height fixed here, it should change.
    <div
      className={`flex flex-col justify-center items-center bg-cover py-10 px-5 sm:px-0 lg:py-auto`}
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundRepeat: "round",
        height: "800px",
      }}
    >
      {/* <div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button className="btn btn-primary font-bold mt-4  text-white rounded p-4 shadow-lg">
          <Link href="/mint">Continue</Link>
        </button>
      </div>
    </div>
  );
}
