  import React, { useState, useEffect, useMemo } from "react";

  import Robot from "../assets/robot.gif";
  import Logout from "./Logout";

  export default function Welcome() {
    const [userName, setUserName] = useState("");
    const [color, setColor] = useState("text-red-500");

    const colors = useMemo(
      () => [
        "text-white",
        "text-pink-300",
        "text-yellow-400",
        "text-teal-400",
        "text-blue-400",
        "text-green-400",
        "text-[rgb(255,99,71)]",
        "text-[rgb(72,61,139)]",
        "text-[rgb(255,165,0)]",
        "text-[rgb(0,191,255)]",
        "text-[rgb(34,139,34)]",
      ],
      []
    );

    useEffect(() => {
      // Fetch username from localStorage
      const fun1 = () => {
        const user = JSON.parse(
          localStorage?.getItem(process.env.REACT_APP_LOCAL_KEY)
        );
        setUserName(user?.username);
      };
      fun1();
    }, []);

    useEffect(() => {
      // Change color every 2000ms
      const interval = setInterval(() => {
        setColor((prevColor) => {
          const currentIndex = colors.indexOf(prevColor);
          const nextIndex = (currentIndex + 1) % colors.length;
          return colors[nextIndex];
        });
      }, 2000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [colors]);

    return (
      <div className="flex flex-col w-full h-screen gap-4 items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 relative">
        <Logout />
        {/* Robot GIF */}
        {/* <div className="w-[100px] h-[100px] md:w-[100px] md:h-[100px] object-cover object-center rounded-full">
            <img src={Robot} alt="Robot" />
        </div> */}

        <div className="w-[250px] h-[250px] md:w-[250px] md:h-[250px] object-cover object-center rounded-full transform translate-y-[-150px]">
            <img src={Robot} alt="Robot" />
        </div>


        {/* Welcome Message */}
        <div className="absolute flex flex-col items-center top-[420px] min-[1350px]:min-h-[700px] min-[1350px]:top-[580px] md:top-[440px] pl-4">
          <h1 className="text-white font-bold text-3xl md:text-4xl">
            Welcome,{" "}
            <span className={`${color} font-bold pl-1 text-3xl md:text-3xl`}>
              {userName}!
            </span>
          </h1>
          <h3 className="text-white font-bold text-lg md:text-xl mt-4">
              Pick a chat and let's get the convo rolling!
          </h3>
        </div>
      </div>
    );
  }
