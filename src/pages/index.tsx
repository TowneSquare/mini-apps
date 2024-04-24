import React from 'react';

export default function Home() {

  // const navigate = useNavigate();

  // function continueHandler(): any {
  //   console.log('Continue');
  //   navigate('/mint_page');
  // }

  return (
      // HERE if u want a background pic
      // TODO: set height fixed here, it should change.
      <div className="flex flex-col justify-center items-center bg-[url('/assets/first_cover.png')] bg-cover py-10 px-5 sm:px-0 lg:py-auto" style={{ height: '800px' }}>
      {/* <div> */}
      <center>
        <a href="/mint_page">
          <button className={'btn btn-primary font-bold mt-4  text-white rounded p-4 shadow-lg'}>
            Continue
          </button>
        </a>
      </center>
    </div>
  );
}
