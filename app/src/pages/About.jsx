import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import about from "../assets/images/about.svg";

const About = () => {
  return (
    <div className="grid min-h-[90vh] px-2 mx-auto w-full md:max-w-[60vw] mt-4 lg:mt-8">
      <div className="grid lg:grid-cols-2 place-items-center gap-8">
        <div className=" place-self-center">
          <img src={about} alt="about" />
        </div>
        <div className="grid gap-10">
          <h1 className="text-xl tracking-wide leading-10">
            ShopCart is a Full-Stack Web App developed as my Capstone Project
            for Upgrad-Knowledgehut Full-Stack Bootcamp. It is a full-stack MERN
            application built using React for front-end, MongoDB for database,
            and Express and Node for back-end.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default About;
