import { Github, Linkedin } from "lucide-react";
import about from "../assets/images/about.svg";

const About = () => {
  return (
    <div className="grid min-h-[80vh] px-2 mx-auto w-full md:max-w-[60vw] mt-4 lg:mt-8">
      <div className="grid lg:grid-cols-2 lg:place-items-center gap-8">
        <div className=" place-self-center">
          <img src={about} alt="about" />
        </div>
        <div className="grid lg:gap-10">
          <h1 className="text-sm font-medium leading-6 xl:text-xl 2xl:leading-10 text-justify">
            <span className="text-primary">ShopCart</span> is a Full-Stack Web
            App developed as my Capstone Project for Upgrad - Knowledgehut
            Full-Stack Bootcamp. It is a full-stack MERN application built using
            React for front-end, MongoDB for database, and Express and Node for
            back-end.
          </h1>
          <div className="grid grid-cols-2">
            <a
              href="https://github.com/AnandBawa"
              target="_blank"
              rel="noreferrer"
              className="flex gap-2 justify-center font-medium tracking-wide transition-all ease-in hover:scale-105"
            >
              <Github color="#2563eb" />
              Anand Bawa
            </a>
            <a
              href="https://www.linkedin.com/in/anandbawa/"
              target="_blank"
              rel="noreferrer"
              className="flex gap-2 justify-center font-medium tracking-wide transition-all ease-in hover:scale-105"
            >
              <Linkedin color="#2563eb" />
              Anand Bawa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
